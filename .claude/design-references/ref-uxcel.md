# Reference: Uxcel — Learning Platform

**Source**: uxcel.com (3 screenshots: Home, Skill Graph, Courses)
**Relevance**: PRIMARY — closest to AGORA's use case (learning + progress tracking)

## Layout Pattern
- **Fixed left sidebar** (~240px wide, white bg, subtle right border)
- **Top bar**: search input + user stats (streak, XP, points) + avatar
- **Main content**: scrollable, padded 32-40px, white background

## Sidebar Structure
- Logo at top left
- Grouped nav items with section labels:
  - Main: Home, Showcase (NEW badge), Skill Graph, Leaderboards
  - LEARN: Courses, Design Briefs (NEW), Career Paths, Lessons, Assessments, Arcade
  - GROW: Salary Explorer (BETA), UX Certifications, Job Board
- Section labels: 11px uppercase, #94a3b8, letter-spacing 1px
- Nav items: 14px, icon + label, rounded 8px hover bg
- Active item: bold text, purple left border or bg tint
- "Leave feedback" button pinned to bottom

## Home Dashboard
- Welcome heading: "Welcome back, Jane!" with avatar (48px circle)
- Status badge: "Portfolio complete" with green checkmark
- **Continue learning** card: course name, progress bar (19%), hours left, "Resume course" purple button
- **Streak card** (right side): "You're on a 2 days streak" with lightning icon
- **League card**: "QUARTZ LEAGUE — You're ranked #20" with green check
- **Recommended for you**: 2-3 course cards in a row
  - Each card: colored icon (48px), title (bold), description (2 lines, gray), level + duration

## Courses Page
- Page title: "Courses" (28px bold)
- Subtitle: gray description text
- **Tab filter**: For you | Beginner | Intermediate | Advanced (underline active)
- **Status dropdown**: "All" filter on right
- **Course grid**: 3 columns
  - Card: white, rounded 16px, subtle shadow
  - Icon/illustration at top (colored, 48-64px)
  - Title: bold 16px
  - Description: 2-3 lines, gray, truncated
  - Footer: level badge + duration ("Beginner · 3 hours")
  - Progress bar if started

## Skill Graph Page
- "Skill Graph" heading with "View Growth" link in purple
- **Design Score**: large number (45) on right
- **Radar chart**: 7 axes (Research, Content Strategy, Leadership, Core Qualities, Visual Design, Interaction Design)
  - Purple fill, labeled axes with scores
- **Filters below**: Worldwide dropdown, All Roles, All Experience, Benchmark Mode toggle
- Sidebar card: "How to build your skill graph?" with description + "Learn more" link

## Key Patterns to Adopt
- Sidebar nav with icon + label + section grouping
- Card-based content with subtle shadows
- Progress indicators (bars, percentages, completion states)
- Tab filtering for content categories
- Streak/gamification elements
- Purple as primary accent
- Clean white background
- Large, clear typography hierarchy
