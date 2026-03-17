import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { decodeReportFromQuery } from '../lib/reportShare.js'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search || ''), [search])
}

export default function Share() {
  const q = useQuery()
  const encoded = q.get('r')
  const report = useMemo(() => decodeReportFromQuery(encoded), [encoded])

  const trendData = useMemo(() => {
    if (!report?.series || report.series.length < 2) return null
    return {
      labels: report.series.map(s => `${s.label} · ${s.date}`),
      datasets: [{
        label: 'Total Score',
        data: report.series.map(s => s.total),
        borderColor: '#1a2744',
        backgroundColor: 'rgba(26,39,68,.08)',
        pointBackgroundColor: '#f59e0b',
        tension: 0.25,
        fill: true,
      }]
    }
  }, [report?.series])

  if (!report) {
    return (
      <div style={{ minHeight: '100vh', padding: 24, background: 'radial-gradient(1200px 700px at 20% 10%, rgba(245,158,11,.18), transparent 60%), radial-gradient(900px 600px at 80% 30%, rgba(56,189,248,.18), transparent 60%), linear-gradient(180deg, #0b1220 0%, #0f172a 65%, #0b1220 100%)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.16)', borderRadius: 18, padding: 18, color: 'white' }}>
          <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 900, fontSize: 20, marginBottom: 6 }}>Invalid share link</div>
          <div style={{ opacity: .75, lineHeight: 1.6 }}>
            This report link is missing data or was copied incorrectly.
          </div>
          <div style={{ marginTop: 12 }}>
            <Link to="/login" style={{ color: '#fbbf24', fontWeight: 900 }}>Go to login →</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', padding: 24, background: 'radial-gradient(1200px 700px at 20% 10%, rgba(245,158,11,.18), transparent 60%), radial-gradient(900px 600px at 80% 30%, rgba(56,189,248,.18), transparent 60%), linear-gradient(180deg, #0b1220 0%, #0f172a 65%, #0b1220 100%)' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <div style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.16)', borderRadius: 18, padding: 18, color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 900, fontSize: 22 }}>The Agora Project — Progress Report</div>
              <div style={{ opacity: .7, marginTop: 6, fontSize: 13, lineHeight: 1.6 }}>
                Generated {new Date(report.generated_at).toLocaleString()}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <a className="btn btn-outline" href="https://vercel.com" style={{ padding: '6px 14px', fontSize: 12, color: 'white', borderColor: 'rgba(255,255,255,.25)', background: 'rgba(255,255,255,.08)' }}>
                Powered by Vercel
              </a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {[
            { label: 'Best Pre-Test', val: report.summary.best_pretest || '—' },
            { label: 'Post-Test', val: report.summary.latest_post || '—' },
            { label: 'Improvement', val: report.summary.improvement != null ? `+${report.summary.improvement}` : '—' },
            { label: 'Streak', val: `${report.summary.streak_current} days` },
          ].map((s) => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.16)', borderRadius: 18, padding: 14, color: 'white' }}>
              <div style={{ opacity: .7, fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.6px' }}>{s.label}</div>
              <div style={{ fontFamily: 'Sora,sans-serif', fontWeight: 900, fontSize: 24, marginTop: 8 }}>{s.val}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.16)', borderRadius: 18, padding: 14, color: 'white' }}>
          <div style={{ fontWeight: 900, marginBottom: 8 }}>Summary</div>
          <div style={{ opacity: .8, fontSize: 13, lineHeight: 1.6 }}>
            Due reviews: {report.summary.due_reviews}
          </div>
        </div>

        {trendData && (
          <div style={{ marginTop: 14, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.16)', borderRadius: 18, padding: 14, color: 'white' }}>
            <div style={{ fontWeight: 900, marginBottom: 10 }}>Score Trend</div>
            <div style={{ height: 260 }}>
              <Line data={trendData} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { ticks: { color: 'rgba(255,255,255,.7)', font: { size: 11 } }, grid: { display: false } },
                  y: { ticks: { color: 'rgba(255,255,255,.7)', font: { size: 11 } }, grid: { color: 'rgba(255,255,255,.12)' } }
                }
              }} />
            </div>
          </div>
        )}

        <div style={{ marginTop: 14, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.16)', borderRadius: 18, padding: 14, color: 'white' }}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Study Guide</div>
          <div style={{ opacity: .8, fontSize: 13 }}>Completed chapters: <b>{report.summary.studied_count}/34</b></div>
        </div>
      </div>
    </div>
  )
}
