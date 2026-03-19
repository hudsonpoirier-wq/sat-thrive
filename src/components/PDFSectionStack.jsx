import PDFPage from './PDFPage.jsx'

export default function PDFSectionStack({ pdfUrl, startPage = 0, endPage = 0, zoom = 1 }) {
  const start = Math.max(0, Number(startPage || 0))
  const end = Math.max(start, Number(endPage || start))
  const pages = Array.from({ length: end - start + 1 }, (_, index) => start + index)

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {pages.map((pageIndex) => (
        <div key={pageIndex} style={{ border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', background: 'white' }}>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', fontSize: 12, fontWeight: 900, color: '#64748b' }}>
            PDF page {pageIndex + 1}
          </div>
          <PDFPage pdfUrl={pdfUrl} pageIndex={pageIndex} zoom={zoom} maxScale={3} />
        </div>
      ))}
    </div>
  )
}
