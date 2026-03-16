# The Agora Project — SAT Prep App

## Quick Start (No installation needed)

Open `sat-thrive-v3.html` directly in any modern browser.
That's it. The entire app runs offline — no server, no install, no internet required after opening.

---

## Demo Login Credentials

| Role    | Email                | Password |
|---------|----------------------|----------|
| Admin   | admin@sat.org        | demo123  |
| Student | alex@email.com       | demo123  |
| Student | maria@email.com      | demo123  |
| Student | james@email.com      | demo123  |
| Student | priya@email.com      | demo123  |

---

## What's Inside

The app is a **single self-contained HTML file** (~616 KB) with everything embedded:
- All 120 SAT Practice Test #11 questions (exact text from College Board PDF)
- Complete question bank with passage text, figures, and answer explanations
- Full Study Guide for all 34 SAT chapters with in-app content (no book needed)
- 15 practice problems per chapter, interactive with explanations
- AI-powered 8-week study plan (requires Anthropic API key — see below)
- Admin panel with Proof of Impact report (paired t-test, donor-ready)
- All data stored in browser localStorage — no backend needed

---

## Features

### For Students
- **Full Timed Practice Test** — 4 modules, real SAT timing, module break
- **Instant Results** — score breakdown, weak topic analysis, question review
- **Study Guide** — full chapter content for all 34 topics, no textbook needed
- **15 Practice Problems per chapter** — click to answer, instant explanations
- **SAT Journey Tracker** — 7-step progress tracker on the dashboard
- **Free-Response Input** — text boxes for student-produced-response math questions

### For Tutors & Admins
- **Admin Panel** — view all student scores and results
- **Manual Paper Test Entry** — enter scores from non-digital tests
- **Printable Study Plans** — custom plans with Playbook page references
- **CSV Export** — download all student data
- **Proof of Impact Report** — paired t-test with p-value, Cohen's d, 95% CI

---

## AI Study Plan (Optional)

The app calls the Anthropic API to generate personalized 8-week study plans.
This works automatically if the app is hosted with your API key set.

For local use: the app will still work without it — students just won't get
the AI-generated plan (they can still see all weak topics and Playbook references).

---

## Deploying as a Website

To host this as a real website:

### Option 1: Static file hosting (easiest)
Upload `sat-thrive-v3.html` to any static host:
- **Netlify**: Drag and drop the file at netlify.com/drop
- **GitHub Pages**: Put in a repo, enable Pages
- **Vercel**: Upload as a static site

### Option 2: Replit / CodeSandbox
Upload the HTML file, share the link.

### Option 3: Add a backend for multi-user persistence
The current app uses localStorage (per-device storage).
For a real multi-school deployment, you'd connect to Supabase (schema included
in `supabase-schema.sql`) and update the `save()`/`load()` functions to use
the Supabase API instead of localStorage.

---

## Files in This Package

```
sat-thrive-v3.html       ← The complete app. Open this.
README.md                ← This file
supabase-schema.sql      ← Database schema for production backend
.env.example             ← Environment variable template
```

---

## Built For

The Agora Project — a nonprofit SAT tutoring program helping underserved students
achieve college access through targeted SAT preparation.

Test used: SAT Practice Test #11 (Official College Board, paper accommodation version)
