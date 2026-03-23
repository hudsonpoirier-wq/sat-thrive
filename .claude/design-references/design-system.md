# AGORA Design System — Extracted from References

## Core Design Principles

### 1. Layout
- **Sidebar navigation** (like Uxcel/Linear): fixed left sidebar with icon + label nav items, collapsible
- **White content area**: main content on clean white or very light gray (#fafafa) background
- **Card-based sections**: all content blocks are rounded cards with subtle shadows
- **Generous whitespace**: large padding (24-32px inside cards), large gaps (20-28px between cards)
- **Max content width**: 1200-1400px centered, with sidebar taking 240-260px

### 2. Typography
- **Headings**: Large, bold (700-900 weight), dark color (#0f172a or similar)
  - Page titles: 28-32px
  - Section headings: 18-22px
  - Card titles: 15-17px
- **Body text**: 14-15px, medium gray (#64748b or #475569), line-height 1.6-1.7
- **Labels/captions**: 11-12px, uppercase, letter-spacing 0.5-1px, muted gray
- **Font families**: Clean sans-serif (Inter, DM Sans, or system font stack)
- **Mixed serif for hero text** (like Hers): optional for landing pages

### 3. Colors
- **Primary accent**: Purple/violet (#7c3aed or #6366f1) — used for active states, CTAs, highlights
- **Secondary accent**: Soft blue (#0ea5e9) — used for links, info states
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)
- **Backgrounds**:
  - Page: #ffffff or #fafbfc
  - Cards: #ffffff
  - Sidebar: #0f172a (dark) or #ffffff (light)
  - Hover: rgba(124,58,237,.06) or #f8fafc
- **Borders**: Very subtle — #e2e8f0 or #f1f5f9, 1px
- **Text**: #0f172a (headings), #334155 (body), #64748b (secondary), #94a3b8 (muted)

### 4. Components

#### Cards
- Border-radius: 16-20px
- Box-shadow: 0 1px 3px rgba(0,0,0,.06), 0 4px 12px rgba(0,0,0,.04)
- Padding: 24-32px
- Border: 1px solid #f1f5f9 (very subtle, almost invisible)
- No heavy borders — use shadow for separation

#### Buttons
- Primary: solid fill with accent color, white text, rounded (10-12px radius)
- Secondary/outline: transparent bg, subtle border, accent text
- Padding: 10-14px vertical, 20-32px horizontal
- Font weight: 700-800
- Hover: darken slightly or add shadow

#### Navigation (Sidebar)
- Fixed left, full height
- Dark variant (#0f172a bg, white/gray text) or light variant (white bg, dark text)
- Nav items: icon (20px) + label, 12-14px, padding 10-14px, rounded 10px
- Active item: accent bg tint, bold text, accent color icon
- Sections grouped with small uppercase labels
- Bottom: user menu or settings

#### Tables
- Clean, minimal borders (bottom border only on rows)
- Header: uppercase, small, muted, bg #f8fafc
- Rows: generous padding (12-16px), hover highlight
- No outer border — contained within card

#### Progress Bars
- Height: 6-8px
- Rounded: border-radius 99px
- Track: #f1f5f9
- Fill: gradient or solid accent color
- Percentage label nearby in small text

#### Metric/Stat Cards
- Large number (24-36px, font-weight 900)
- Small label above (11px uppercase muted)
- Optional sub-label below
- Icon or colored accent dot
- Grid layout: 3-4 per row

#### Input Fields
- Border-radius: 10-12px
- Border: 1.5px solid #e2e8f0
- Padding: 12-14px
- Focus: accent border color with subtle glow
- Label above in small bold text

### 5. Spacing Scale
- 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 40px, 48px, 64px

### 6. Shadows
- Subtle: 0 1px 3px rgba(0,0,0,.05)
- Medium: 0 4px 12px rgba(0,0,0,.08)
- Elevated: 0 8px 24px rgba(0,0,0,.12)
- Cards use subtle-to-medium
- Modals/dropdowns use elevated

### 7. Transitions
- Duration: 200-300ms
- Easing: ease or cubic-bezier(0.4, 0, 0.2, 1)
- Properties: background, color, box-shadow, transform, opacity

### 8. Dark Mode Elements
- Some pages (like dashboards) use dark backgrounds (#0f172a, #1e293b)
- Charts and data visualizations look great on dark
- Text on dark: white (#ffffff) at various opacities (1.0, 0.8, 0.6, 0.4)

## Reference Priority for AGORA

1. **Uxcel** — Primary reference (learning platform with sidebar, courses, progress tracking)
2. **Hers/Hims** — Category cards, clean whitespace, feature grids
3. **Linear** — Sidebar nav pattern, data tables, dark theme option
4. **Airbnb** — Card grid patterns, search/filter UI
5. **Uniswap** — Dashboard metrics, chart layouts, tab navigation
6. **Monday.com** — Hero sections, icon category grids
7. **Stock app (dark)** — Dark dashboard with charts and KPI metrics
8. **Duolingo** — Completion/celebration screens, gamification UI
