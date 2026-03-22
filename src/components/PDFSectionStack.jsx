import { useEffect, useRef } from 'react'
import PDFPage from './PDFPage.jsx'

export default function PDFSectionStack({ pdfUrl, startPage = 0, endPage = 0, zoom = 1, initialPageIndex = null, initialScrollRatio = 0, containerStyle = {} }) {
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
    const ratio = Math.max(0, Math.min(0.95, Number(initialScrollRatio || 0)))

    // Find the nearest scrollable ancestor (root itself, or a parent like .test-pdf-panel)
    const findScrollParent = (el) => {
      let p = el
      while (p && p !== document.body) {
        if (p.scrollHeight > p.clientHeight + 2) {
          const style = getComputedStyle(p)
          if (style.overflowY === 'auto' || style.overflowY === 'scroll') return p
        }
        p = p.parentElement
      }
      return null
    }

    const scrollToTarget = () => {
      const scrollParent = findScrollParent(root)
      if (scrollParent) {
        // Calculate node position relative to the scroll parent
        const nodeRect = node.getBoundingClientRect()
        const parentRect = scrollParent.getBoundingClientRect()
        const offsetInParent = nodeRect.top - parentRect.top + scrollParent.scrollTop
        const offsetWithinNode = (node.offsetHeight || 0) * ratio
        try {
          scrollParent.scrollTo({ top: Math.max(0, offsetInParent + offsetWithinNode - 24), behavior: 'smooth' })
        } catch {
          scrollParent.scrollTop = Math.max(0, offsetInParent + offsetWithinNode - 24)
        }
      } else {
        // No scrollable parent found — scroll window
        try {
          const rect = node.getBoundingClientRect()
          const offsetWithinNode = (node.offsetHeight || 0) * ratio
          window.scrollTo({ top: Math.max(0, window.scrollY + rect.top + offsetWithinNode - 120), behavior: 'smooth' })
        } catch {
          node.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    }
    requestAnimationFrame(scrollToTarget)
    const timeout = setTimeout(scrollToTarget, 350)
    return () => clearTimeout(timeout)
  }, [initialPageIndex, initialScrollRatio, pdfUrl, startPage, endPage, zoom])

  return (
    <div ref={rootRef} style={{ display: 'grid', gap: 12, overflowY: 'auto', height: '100%', ...containerStyle }}>
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
