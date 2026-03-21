import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'

const MAX_ENCODED_LENGTH = 50_000
const MAX_DECODED_LENGTH = 500_000

export function encodeReportToQuery(reportObj) {
  const json = JSON.stringify(reportObj || {})
  if (json.length > MAX_DECODED_LENGTH) return null
  return compressToEncodedURIComponent(json)
}

export function decodeReportFromQuery(encoded) {
  if (!encoded || typeof encoded !== 'string' || encoded.length > MAX_ENCODED_LENGTH) return null
  try {
    const raw = decompressFromEncodedURIComponent(encoded)
    if (!raw || raw.length > MAX_DECODED_LENGTH) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}
