import { useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

const pdfCache = {}

function fileLabel(url) {
  try {
    const u = String(url || '')
    const clean = u.split('?')[0].split('#')[0]
    const last = clean.split('/').filter(Boolean).pop()
    return last || clean || 'PDF'
  } catch {
    return 'PDF'
  }
}

export default function PDFPage({ pdfUrl, pageIndex, zoom = 1, maxScale = 2 }) {
  const canvasRef = useRef(null)
  const [status, setStatus] = useState('loading')
  const [retryNonce, setRetryNonce] = useState(0)
  const renderTask = useRef(null)

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    async function render() {
      if (cancelled) return

      const url = String(pdfUrl || '').trim()
      if (!url) throw new Error('Missing PDF URL')

      if (!pdfCache[url]) {
        const task = pdfjsLib.getDocument(url)
        pdfCache[url] = task.promise.catch((e) => {
          delete pdfCache[url]
          throw e
        })
      }
      const pdf = await pdfCache[url]
      if (cancelled) return

      const pageNum = Math.min(Math.max(1, pageIndex + 1), pdf.numPages)
      const page = await pdf.getPage(pageNum)
      if (cancelled) return

      const canvas = canvasRef.current
      if (!canvas) return

      const containerWidth = canvas.parentElement?.clientWidth || 700
      const viewport = page.getViewport({ scale: 1 })
      const base = containerWidth / viewport.width
      const z = Number.isFinite(Number(zoom)) ? Math.max(0.5, Math.min(3, Number(zoom))) : 1
      const cap = Number.isFinite(Number(maxScale)) ? Math.max(1, Number(maxScale)) : 2
      const scale = Math.min(base * z, cap)
      const scaledViewport = page.getViewport({ scale })

      canvas.width = scaledViewport.width
      canvas.height = scaledViewport.height

      if (renderTask.current) {
        renderTask.current.cancel()
      }

      const ctx = canvas.getContext('2d')
      renderTask.current = page.render({ canvasContext: ctx, viewport: scaledViewport })
      try {
        await renderTask.current.promise
        if (!cancelled) setStatus('done')
      } catch (e) {
        if (e.name !== 'RenderingCancelledException' && !cancelled) setStatus('error')
      }
    }

    render().catch(() => { if (!cancelled) setStatus('error') })

    return () => {
      cancelled = true
      if (renderTask.current) renderTask.current.cancel()
    }
  }, [pdfUrl, pageIndex, zoom, maxScale, retryNonce])

  return (
    <div className="pdf-canvas-wrap" style={{ position: 'relative', width: '100%' }}>
      {status === 'loading' && (
        <div style={{ position: 'absolute', inset: 0, minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', zIndex: 1 }}>
          <div style={{ textAlign: 'center', color: '#94a3b8' }}>
            <div className="spinner" style={{ borderTopColor: '#1a2744', width: 24, height: 24, borderWidth: 3, margin: '0 auto 10px' }} />
            <div style={{ fontSize: 13 }}>Loading question…</div>
          </div>
        </div>
      )}
      {status === 'error' && (
        <div style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fef2f2', borderRadius: 4 }}>
          <div style={{ textAlign: 'center', color: '#dc2626', padding: 24 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>⚠️</div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>PDF not loaded</div>
            <div style={{ fontSize: 13, color: '#64748b' }}>
              Couldn’t load <code>{fileLabel(pdfUrl)}</code>. Try again (this can happen on spotty connections).
            </div>
            <button
              className="btn btn-outline"
              style={{ marginTop: 12, padding: '8px 14px', fontSize: 13, borderColor: '#fecaca', background: 'rgba(255,255,255,.8)' }}
              onClick={() => {
                try { delete pdfCache[String(pdfUrl || '').trim()] } catch {}
                setRetryNonce((n) => n + 1)
              }}
            >
              Retry
            </button>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: status === 'done' ? 'block' : 'none', width: '100%' }} />
    </div>
  )
}
