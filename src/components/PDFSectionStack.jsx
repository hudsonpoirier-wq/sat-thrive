import { useEffect, useRef } from 'react'
import PDFPage from './PDFPage.jsx'

export default function PDFSectionStack({ pdfUrl, startPage = 0, endPage = 0, zoom = 1, initialPageIndex = null, initialScrollRatio = 0 }) {
  const start = Math.max(0, Number(startPage || 0))
  const end = Math.max(start, Number(endPage || start))
  const pages = Array.from({ length: end - start + 1 }, (_, index) => start + index)
  const rootRef = useRef(null)
  const pageRefs = useRef({})

  useEffect(() => {
    const targetPage = Number(initialPageIndex)
    if (!Number.isFinite(targetPage)) return
    const node = pageRefs.current?.[targetPage]
    const root = rootRef.current
    if (!node || !root) return
    const scrollRatio = Math.max(0, Math.min(0.95, Number(initialScrollRatio || 0)))
    const scrollToTarget = () => {
      try {
        const top = node.offsetTop + ((node.offsetHeight || 0) * scrollRatio)
        root.scrollTo({ top: Math.max(0, top - 24), behavior: 'smooth' })
      } catch {
        root.scrollTop = Math.max(0, node.offsetTop + ((node.offsetHeight || 0) * scrollRatio) - 24)
      }
    }
    requestAnimationFrame(scrollToTarget)
    const timeout = setTimeout(scrollToTarget, 350)
    return () => clearTimeout(timeout)
  }, [initialPageIndex, initialScrollRatio, pdfUrl, startPage, endPage, zoom])

  return (
    <div ref={rootRef} style={{ display: 'grid', gap: 12 }}>
      {pages.map((pageIndex) => (
        <div
          key={pageIndex}
          ref={(node) => {
            if (node) pageRefs.current[pageIndex] = node
          }}
          style={{ border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', background: 'white' }}
        >
          <div style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', fontSize: 12, fontWeight: 900, color: '#64748b' }}>
            PDF page {pageIndex + 1}
          </div>
          <PDFPage pdfUrl={pdfUrl} pageIndex={pageIndex} zoom={zoom} maxScale={3} />
        </div>
      ))}
    </div>
  )
}
