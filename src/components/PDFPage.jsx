import { useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import Icon from './AppIcons.jsx'

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

export default function PDFPage({ pdfUrl, pageIndex, zoom = 1, maxScale = 2.6, crop = null }) {
  const canvasRef = useRef(null)
  const [status, setStatus] = useState('loading')
  const [retryNonce, setRetryNonce] = useState(0)
  const renderTask = useRef(null)
  const autoRetriedRef = useRef(false)

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    autoRetriedRef.current = false

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
      const cssViewport = page.getViewport({ scale })
      const outputScale = (typeof window !== 'undefined' && window?.devicePixelRatio) ? Math.min(2.5, Math.max(1, window.devicePixelRatio)) : 1
      const renderViewport = page.getViewport({ scale: scale * outputScale })

      if (renderTask.current) {
        renderTask.current.cancel()
      }

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const norm = (v, fallback) => {
        const n = Number(v)
        if (!Number.isFinite(n)) return fallback
        return Math.max(0, Math.min(1, n))
      }
      const hasCrop = crop && typeof crop === 'object'
      const cx = hasCrop ? norm(crop.x, 0) : 0
      const cy = hasCrop ? norm(crop.y, 0) : 0
      const cw = hasCrop ? Math.max(0.05, norm(crop.w, 1)) : 1
      const ch = hasCrop ? Math.max(0.05, norm(crop.h, 1)) : 1

      if (!hasCrop) {
        canvas.width = Math.floor(renderViewport.width)
        canvas.height = Math.floor(renderViewport.height)
        canvas.style.width = `${Math.round(cssViewport.width)}px`
        canvas.style.height = `${Math.round(cssViewport.height)}px`
        canvas.style.maxWidth = 'none'
        renderTask.current = page.render({ canvasContext: ctx, viewport: renderViewport })
      } else {
        const off = document.createElement('canvas')
        off.width = Math.floor(renderViewport.width)
        off.height = Math.floor(renderViewport.height)
        const offCtx = off.getContext('2d')
        if (!offCtx) return
        renderTask.current = page.render({ canvasContext: offCtx, viewport: renderViewport })
        await renderTask.current.promise
        if (cancelled) return

        const sx = Math.floor(cx * off.width)
        const sy = Math.floor(cy * off.height)
        const sw = Math.max(1, Math.floor(cw * off.width))
        const sh = Math.max(1, Math.floor(ch * off.height))

        canvas.width = sw
        canvas.height = sh
        canvas.style.width = `${Math.round(containerWidth)}px`
        const displayHeight = Math.round((sh / Math.max(1, sw)) * containerWidth)
        canvas.style.height = `${Math.max(180, displayHeight)}px`
        canvas.style.maxWidth = 'none'
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(off, sx, sy, sw, sh, 0, 0, sw, sh)
        if (!cancelled) setStatus('done')
        return
      }
      try {
        await renderTask.current.promise
        if (!cancelled) setStatus('done')
      } catch (e) {
        if (e.name !== 'RenderingCancelledException' && !cancelled) setStatus('error')
      }
    }

    render().catch(() => {
      if (cancelled) return
      setStatus('error')
      // Auto-retry once on transient failures (prevents "refresh fixes it" glitches).
      if (!autoRetriedRef.current) {
        autoRetriedRef.current = true
        setTimeout(() => {
          if (cancelled) return
          try { delete pdfCache[String(pdfUrl || '').trim()] } catch {}
          setRetryNonce((n) => n + 1)
        }, 600)
      }
    })

    return () => {
      cancelled = true
      if (renderTask.current) renderTask.current.cancel()
    }
  }, [pdfUrl, pageIndex, zoom, maxScale, crop, retryNonce])

  return (
    <div className="pdf-canvas-wrap" style={{ position: 'relative', width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
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
            <div style={{ marginBottom: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: 12, background: 'rgba(239,68,68,.10)', color: '#dc2626' }}>
              <Icon name="warning" size={22} />
            </div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>PDF not loaded</div>
            <div style={{ fontSize: 13, color: '#64748b' }}>
              Couldn't load <code>{fileLabel(pdfUrl)}</code>. Try again (this can happen on spotty connections).
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
      <canvas ref={canvasRef} style={{ display: status === 'done' ? 'block' : 'none' }} />
    </div>
  )
}
