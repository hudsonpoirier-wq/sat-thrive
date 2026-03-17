import fs from 'node:fs'
import path from 'node:path'

import { TESTS } from '../src/data/tests.js'
import { ANSWER_KEY } from '../src/data/testData.js'
import { EXTRA_ANSWER_KEYS } from '../src/data/extraAnswerKeys.js'
import { FINAL_ANSWER_KEY } from '../src/data/finalAnswerKey.js'

const ROOT = path.resolve(process.cwd())
const OUT_DIR = path.join(ROOT, 'public', 'answer-keys')

function keyFor(testId) {
  if (testId === 'pre_test') return ANSWER_KEY
  if (testId === 'final_test') return FINAL_ANSWER_KEY
  if (EXTRA_ANSWER_KEYS?.[testId]) return EXTRA_ANSWER_KEYS[testId]
  return null
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function renderTable(map) {
  const keys = Object.keys(map || {}).map((k) => Number(k)).filter(Number.isFinite).sort((a, b) => a - b)
  return keys.map((q) => (
    `<tr><td class="q">${q}</td><td class="a">${escapeHtml(map[q])}</td></tr>`
  )).join('\n')
}

function pageHtml({ title, subtitle, pdfUrl, appUrl, key }) {
  const sections = [
    { id: 'rw_m1', label: 'Reading & Writing · Module 1 (Q1–33)' },
    { id: 'rw_m2', label: 'Reading & Writing · Module 2 (Q1–33)' },
    { id: 'math_m1', label: 'Math · Module 1 (Q1–27)' },
    { id: 'math_m2', label: 'Math · Module 2 (Q1–27)' },
  ]

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <style>
      :root { color-scheme: light; }
      body { margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; background: #f8fafc; color: #0f172a; }
      header { position: sticky; top: 0; z-index: 10; background: white; border-bottom: 1px solid #e2e8f0; }
      .wrap { max-width: 1000px; margin: 0 auto; padding: 16px; }
      h1 { margin: 0; font-size: 18px; font-weight: 900; }
      .sub { margin-top: 4px; font-size: 13px; color: #64748b; }
      .actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px; }
      a.btn { display: inline-flex; align-items: center; justify-content: center; padding: 10px 12px; border-radius: 10px; text-decoration: none; font-weight: 800; font-size: 13px; border: 1px solid #e2e8f0; background: #ffffff; color: #0f172a; }
      a.btn.primary { background: #0ea5e9; border-color: #0ea5e9; color: white; }
      main .wrap { padding-top: 18px; padding-bottom: 40px; }
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 12px; }
      .card { background: white; border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px; }
      .title { font-size: 12px; font-weight: 900; letter-spacing: .6px; text-transform: uppercase; color: #64748b; margin-bottom: 10px; }
      table { width: 100%; border-collapse: collapse; }
      td { padding: 6px 0; border-bottom: 1px dashed #e2e8f0; font-size: 13px; }
      td.q { width: 48px; color: #64748b; font-weight: 800; }
      td.a { font-weight: 900; text-align: right; }
      .note { margin-top: 12px; font-size: 12px; color: #64748b; line-height: 1.5; }
      code { background: #f1f5f9; border: 1px solid #e2e8f0; padding: 0 6px; border-radius: 8px; }
    </style>
  </head>
  <body>
    <header>
      <div class="wrap">
        <h1>${escapeHtml(title)}</h1>
        <div class="sub">${escapeHtml(subtitle)}</div>
        <div class="actions">
          ${pdfUrl ? `<a class="btn primary" href="${escapeHtml(pdfUrl)}" target="_blank" rel="noreferrer">Open Test PDF →</a>` : ''}
          <a class="btn" href="${escapeHtml(appUrl)}" target="_blank" rel="noreferrer">Open App →</a>
        </div>
        <div class="note">
          Free-response answers may allow equivalent forms (ex: <code>.5</code> vs <code>1/2</code>, <code>pi</code> vs <code>π</code>).
        </div>
      </div>
    </header>
    <main>
      <div class="wrap">
        <div class="grid">
          ${sections.map((s) => {
            const rows = renderTable(key?.[s.id] || {})
            return `<div class="card">
              <div class="title">${escapeHtml(s.label)}</div>
              <table><tbody>${rows}</tbody></table>
            </div>`
          }).join('\n')}
        </div>
      </div>
    </main>
  </body>
</html>`
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const appUrl = '/login'
  const targets = TESTS.map((t) => ({ id: t.id, label: t.label, pdfUrl: t.pdfUrl }))
  for (const t of targets) {
    const key = keyFor(t.id)
    if (!key) throw new Error(`Missing built-in key for ${t.id}`)
    const outPath = path.join(OUT_DIR, `${t.id}.html`)
    const html = pageHtml({
      title: `${t.label} — Answer Key`,
      subtitle: 'The Agora Project · 4 modules · 120 questions',
      pdfUrl: t.pdfUrl,
      appUrl,
      key,
    })
    fs.writeFileSync(outPath, html)
  }

  console.log('Wrote answer key pages to:', OUT_DIR)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

