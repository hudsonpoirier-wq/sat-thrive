# Reference: Linear — Dark Sidebar + Data

**Source**: linear.app (2 screenshots: issue tracker, agent insights)
**Relevance**: MEDIUM-HIGH — sidebar navigation, dark theme, data tables

## Layout Pattern
- **Top nav**: minimal, logo left, nav links centered (Product, Resources, etc.), Sign up button right
- **Product demo** embedded below in dark card with rounded corners

## Sidebar (Product UI)
- Dark background (#1a1a2e or similar)
- **Logo + workspace** at top with action icons
- **Nav groups**:
  - Inbox, My Issues, Reviews, Pulse
  - Workspace: Initiatives, Projects, More
  - Favorites: pinned items with colored indicators
- Items: 13px, icon + label, hover highlight
- Active: white text + subtle bg
- Collapsible sections with chevrons

## Issue Detail View
- **Breadcrumb** at top: "ENG-2703"
- Title: bold, 18-20px
- **Activity feed**: timeline of comments with avatars, timestamps
- **Side panel**: status dropdown (In Progress), priority, assignee, labels
- GitHub Copilot integration card at bottom

## Agent Insights Dashboard
- **3 metric cards** in a row:
  - "Delegated issues completed: 3,389" — large number, small label
  - "In progress: 1,128"
  - "In review: 729"
- **Bar chart**: "Agent tasks per assignee" — stacked bars, colored by type
- **Data table**: Projects agents are working on
  - Columns: Project, Issues, Current, Codex, Copilot
  - Clean rows, no outer border
  - Numbers right-aligned

## Color Palette (Dark)
- Background: #0f0f1a or #1a1a2e
- Cards: slightly lighter (#252540)
- Text: white at various opacities
- Accent: blue (#5b7aff), yellow (#f5c542), purple
- Chart colors: blue, yellow, purple stacked
- Borders: rgba(255,255,255,.08)

## Key Patterns to Adopt
- **Dark sidebar** with workspace/project hierarchy
- **Metric cards** with large numbers in a row
- **Stacked bar charts** with colored categories
- **Clean data tables** inside dark cards
- **Activity/timeline feed** pattern
