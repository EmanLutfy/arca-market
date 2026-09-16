import { NextResponse } from "next/server";

const GAMMA_MARKETS_URL =
  "https://gamma-api.polymarket.com/markets?active=true&closed=false&limit=50&order=volume24hr&ascending=false";

function parseArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const response = await fetch(GAMMA_MARKETS_URL, {
      headers: { accept: "application/json" },
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Polymarket API unavailable" }, { status: 502 });
    }

    const raw = (await response.json()) as Record<string, unknown>[];
    const markets = raw.map((market) => ({
      source: "polymarket",
      sourceMarketId: String(market.id ?? market.conditionId ?? ""),
      slug: String(market.slug ?? market.id ?? ""),
      question: String(market.question ?? ""),
      endDate: String(market.endDate ?? ""),
      volume: Number(market.volumeNum ?? market.volume ?? 0),
      liquidity: Number(market.liquidityNum ?? market.liquidity ?? 0),
      outcomes: parseArray(market.outcomes),
      outcomePrices: parseArray(market.outcomePrices),
      url: market.slug ? `https://polymarket.com/market/${market.slug}` : null,
    })).filter((market) => market.sourceMarketId && market.question);

    return NextResponse.json({ markets });
  } catch {
    return NextResponse.json({ error: "Unable to fetch Polymarket markets" }, { status: 500 });
  }
}
