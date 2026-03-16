# The Agora Project — SAT Prep App

## What this repo is

This is the **hosted web app** version (React + Vite + Supabase). It supports:
- Separate accounts per user
- Cloud persistence (no localStorage)
- An admin account that can view all students (via Supabase RLS policies)

To run it locally:

```bash
npm install
npm run dev
```

To deploy to Vercel: connect the repo and it deploys automatically (`vercel.json` is configured).

## What's new in v3 vs v2

- ✅ All 120 questions from SAT Practice Test #11 — exact text from College Board PDFs
- ✅ Manual paper test entry (Admin → Enter Paper Test)
- ✅ Printable custom study plan per student (exact Playbook page references)
- ✅ Printable Proof of Impact donor report (paired t-test, 99% confidence)
- ✅ CSV export of all student data
- ✅ Fixed: FILL_Q, CHAPTERS, ANSWER_KEY all properly defined
- ✅ Fixed: missing </script></body></html> closing tags
- ✅ Fixed: broken regex in nested template literal

## Admin account (create once)

Create this Supabase Auth user:
- Email: `admin@sat.org`
- Password: `demo1234`

Then, in Supabase SQL Editor, run:
```sql
update public.profiles set role = 'admin' where email = 'admin@sat.org';
```

## Environment variables (Vercel + local)

Set these:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Vercel build settings:
- Build Command: `npm run build`
- Output Directory: `dist`

## Database setup (Supabase)

Run `supabase-schema.sql` in Supabase SQL Editor. It creates:
- `profiles`, `test_attempts`, `post_scores`
- `studied_topics` (chapter completion tracking)
- RLS policies (users see only their own data; admin sees all)

## File structure
```
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
