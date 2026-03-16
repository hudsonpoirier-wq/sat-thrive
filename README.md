# SAT Thrive — 1550+ Architect (v3)

## What's in this package

Two ways to deploy this tool:

### Option 1: Standalone HTML (easiest — no server needed)
Open `sat-thrive-v3.html` directly in any browser. Works offline. All data is stored in localStorage.

### Option 2: React App (for a real hosted website)
The `src/` folder contains the original React/Vite source. To run it:

```bash
npm install
npm run dev
```

To deploy to Vercel: connect the repo and it deploys automatically (vercel.json is configured).

## What's new in v3 vs v2

- ✅ All 120 questions from SAT Practice Test #11 — exact text from College Board PDFs
- ✅ Manual paper test entry (Admin → Enter Paper Test)
- ✅ Printable custom study plan per student (exact Playbook page references)
- ✅ Printable Proof of Impact donor report (paired t-test, 99% confidence)
- ✅ CSV export of all student data
- ✅ Fixed: FILL_Q, CHAPTERS, ANSWER_KEY all properly defined
- ✅ Fixed: missing </script></body></html> closing tags
- ✅ Fixed: broken regex in nested template literal

## Demo login
- Admin: `admin@sat.org` / `demo123`
- Students: `alex@email.com`, `maria@email.com`, `james@email.com`, `priya@email.com` / `demo123`

## To use AI study plan generation
Set your Anthropic API key in the deployed environment. See `.env.example`.

## File structure
```
sat-thrive-v3.html     ← Standalone app (use this for demos)
src/
  pages/
    Dashboard.jsx      ← Student home
    Admin.jsx          ← Admin panel (students, results, proof of impact)
    TestTaking.jsx     ← 4-module timed test
    Results.jsx        ← Scores, weak topics, study plan
    Login.jsx          ← Auth
  data/
    testData.js        ← Answer keys, chapter map, scoring
public/
  practice-test-11.pdf ← Official College Board test PDF
supabase-schema.sql    ← Database schema for production deployment
```
