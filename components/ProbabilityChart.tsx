"use client";

import { useMemo, useRef, useState } from "react";

type Point = { t: string; p: number };

export function ProbabilityChart({ data }: { data: Point[] }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const W = 640;
  const H = 220;
  const PAD = 24;

  const { path, areaPath, points } = useMemo(() => {
    const min = Math.min(...data.map((d) => d.p)) - 5;
    const max = Math.max(...data.map((d) => d.p)) + 5;
    const range = max - min || 1;
    const step = (W - PAD * 2) / (data.length - 1);

    const pts = data.map((d, i) => ({
      x: PAD + i * step,
      y: H - PAD - ((d.p - min) / range) * (H - PAD * 2),
      ...d,
    }));

    const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
    const areaPath = `${path} L${pts[pts.length - 1].x},${H - PAD} L${pts[0].x},${H - PAD} Z`;

    return { path, areaPath, points: pts };
  }, [data]);

  const handleMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * W;
    let nearest = 0;
    let best = Infinity;
    points.forEach((p, i) => {
      const d = Math.abs(p.x - x);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setHoverIndex(nearest);
  };

  const active = hoverIndex !== null ? points[hoverIndex] : points[points.length - 1];

  return (
    <div>
      <div className="mb-4 flex items-baseline gap-4">
        <div>
          <p className="text-xs text-ink-dim">Probability</p>
          <p className="font-display text-2xl font-semibold">{active.p}%</p>
        </div>
        <div>
          <p className="text-xs text-ink-dim">Time</p>
          <p className="text-sm text-ink-muted">{active.t}, 2026</p>
        </div>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full cursor-crosshair"
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d98e3e" stopOpacity="0.35" />
            <stop offset="1" stopColor="#d98e3e" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={PAD}
            x2={W - PAD}
            y1={PAD + (H - PAD * 2) * f}
            y2={PAD + (H - PAD * 2) * f}
            stroke="rgba(255,255,255,0.06)"
          />
        ))}

        <path d={areaPath} fill="url(#chartFill)" />
        <path d={path} fill="none" stroke="#d98e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {hoverIndex !== null && (
          <>
            <line
              x1={points[hoverIndex].x}
              x2={points[hoverIndex].x}
              y1={PAD}
              y2={H - PAD}
              stroke="rgba(255,255,255,0.14)"
            />
            <circle cx={points[hoverIndex].x} cy={points[hoverIndex].y} r="4.5" fill="#d98e3e" />
          </>
        )}
      </svg>
    </div>
  );
}
