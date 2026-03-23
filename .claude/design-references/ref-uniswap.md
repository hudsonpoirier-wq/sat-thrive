# Reference: Uniswap — Data Dashboard

**Source**: app.uniswap.org (2 screenshots: explore tokens, token detail)
**Relevance**: MEDIUM — clean data dashboards, charts, tables

## Layout Pattern
- **Top nav**: logo + nav links left (Trade, Explore, Pool), search center, wallet button right
- **White background**, clean and minimal
- Content centered, ~1200px max width

## Explore Page
- **2 metric cards** side by side:
  - "Uniswap TVL: $3.35B" — small label, huge number
  - "Uniswap volume: $96.83B" — with time period toggles (D, W, M)
  - Area/bar chart below each metric
- **Tab navigation**: Tokens | Pools | Transactions (underline active)
- **Filters**: chain selector, volume dropdown, search icon
- **Token table**:
  - Columns: #, Token name, Price, 1 hour, 1 day, FDV, Volume
  - Token rows: icon + name + ticker
  - Percentage changes: green up, red down
  - Sparkline mini-charts in last column
  - Clean borders, alternating hover

## Token Detail Page
- **Breadcrumb**: Explore > Tokens > ETH
- **Token header**: icon (32px) + name + ticker
- **Price**: huge ($2,596.85), percentage change in green/red
- **Price chart**: candlestick, time range selectors (H4, 1D, 1W, 1M, 1Y)
- **Stats row**: TVL, Market cap, FDV, 1 day volume — each with large number
- **Swap widget** (right side): card with Sell/Buy inputs, token selector
- **Balance card**: user's token balance
- **Info section**: links to Etherscan, Website, Twitter
- **Transactions/Pools** tabs below

## Key Patterns to Adopt
- **Large metric numbers** with small labels
- **Chart + metric** combination cards
- **Sparkline mini-charts** in table rows
- **Time range toggles** (D, W, M, Y) for charts
- **Tab navigation** for data categories
- **Percentage badges** with color coding (green/red)
