import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'

export function encodeReportToQuery(reportObj) {
  const json = JSON.stringify(reportObj || {})
  return compressToEncodedURIComponent(json)
}

export function decodeReportFromQuery(encoded) {
  const raw = decompressFromEncodedURIComponent(String(encoded || ''))
  if (!raw) return null
  try { return JSON.parse(raw) } catch { return null }
}

