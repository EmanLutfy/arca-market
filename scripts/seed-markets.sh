#!/usr/bin/env bash
set -euo pipefail

: "${PRIVATE_KEY:?Set PRIVATE_KEY in your terminal first}"
: "${CONTRACT:?Set CONTRACT to the deployed ArcaPredictionMarket address first}"
RPC="${ARC_TESTNET_RPC_URL:-https://rpc.testnet.arc.network}"

create_market() {
  local slug="$1"
  local question="$2"
  local close_date="$3"
  local close_time
  local resolution_time

  close_time=$(date -j -f "%Y-%m-%d" "$close_date" +%s)
  resolution_time=$((close_time + 86400))

  echo "Creating $slug..."
  cast send "$CONTRACT" \
    "createMarket(string,uint64,uint64,string)" \
    "$question" "$close_time" "$resolution_time" "arca-static:$slug" \
    --rpc-url "$RPC" \
    --private-key "$PRIVATE_KEY"
}

create_market "fed-rate-cut-2026" \
  "Will the Fed cut rates before December 2026?" "2026-12-01"
create_market "eth-outperform-btc-q4" \
  "Will ETH outperform BTC in Q4 2026?" "2026-12-31"
create_market "next-gen-console-2026" \
  "Will a next-gen game console ship before end of 2026?" "2026-12-31"
create_market "champions-league-final-holder" \
  "Will the reigning champion reach the final again?" "2027-05-01"
create_market "election-turnout-record" \
  "Will the next general election set a turnout record?" "2027-07-01"

echo "Done. These markets are expected to receive IDs 2 through 6."
