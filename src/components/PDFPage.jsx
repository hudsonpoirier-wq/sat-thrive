import { useEffect, useRef, useState } from 'react'

let pdfLib = null
let loadingLib = false
const callbacks = []

function loadPdfJs() {
  return new Promise((resolve) => {
    if (pdfLib) { resolve(pdfLib); return }
    callbacks.push(resolve)
    if (loadingLib) return
    loadingLib = true
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
      pdfLib = window.pdfjsLib
      callbacks.forEach(cb => cb(pdfLib))
    }
    document.head.appendChild(script)
  })
}

const pdfCache = {}

export default function PDFPage({ pdfUrl, pageIndex }) {
  const canvasRef = useRef(null)
  const [status, setStatus] = useState('loading')
  const renderTask = useRef(null)

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    async function render() {
      const lib = await loadPdfJs()
      if (cancelled) return

      if (!pdfCache[pdfUrl]) {
        pdfCache[pdfUrl] = lib.getDocument(pdfUrl).promise
      }
      const pdf = await pdfCache[pdfUrl]
      if (cancelled) return

      const pageNum = Math.min(Math.max(1, pageIndex + 1), pdf.numPages)
      const page = await pdf.getPage(pageNum)
      if (cancelled) return

      const canvas = canvasRef.current
      if (!canvas) return

      const containerWidth = canvas.parentElement?.clientWidth || 700
      const viewport = page.getViewport({ scale: 1 })
      const scale = Math.min(containerWidth / viewport.width, 2)
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
  }, [pdfUrl, pageIndex])

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
              Place <code>practice-test-11.pdf</code> in the <code>/public</code> folder
            </div>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: status === 'done' ? 'block' : 'none', width: '100%' }} />
    </div>
  )
}
