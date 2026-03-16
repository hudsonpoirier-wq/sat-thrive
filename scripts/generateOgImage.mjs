import fs from 'node:fs'
import { PNG } from 'pngjs'

const logoPath = process.argv[2]
const outPath = process.argv[3]
if (!logoPath || !outPath) {
  console.error('Usage: node scripts/generateOgImage.mjs <logo.png> <out.png>')
  process.exit(2)
}

function lerp(a, b, t) { return a + (b - a) * t }

function blendPixel(dst, dstIdx, srcR, srcG, srcB, srcA) {
  const a = srcA / 255
  const inv = 1 - a
  dst.data[dstIdx] = Math.round(srcR * a + dst.data[dstIdx] * inv)
  dst.data[dstIdx + 1] = Math.round(srcG * a + dst.data[dstIdx + 1] * inv)
  dst.data[dstIdx + 2] = Math.round(srcB * a + dst.data[dstIdx + 2] * inv)
  dst.data[dstIdx + 3] = Math.round(255 * (a + (dst.data[dstIdx + 3] / 255) * inv))
}

const W = 1200
const H = 630
const out = new PNG({ width: W, height: H })

// Background gradient (navy -> blue) + subtle vignette.
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const idx = (W * y + x) << 2
    const tx = x / (W - 1)
    const ty = y / (H - 1)
    const t = Math.min(1, Math.max(0, (tx * 0.85 + ty * 0.15)))
    const r = Math.round(lerp(10, 30, t))
    const g = Math.round(lerp(18, 58, t))
    const b = Math.round(lerp(40, 138, t))

    // Vignette
    const dx = (tx - 0.5)
    const dy = (ty - 0.5)
    const d = Math.sqrt(dx * dx + dy * dy)
    const v = Math.max(0, 1 - d * 1.35)

    out.data[idx] = Math.round(r * v)
    out.data[idx + 1] = Math.round(g * v)
    out.data[idx + 2] = Math.round(b * v)
    out.data[idx + 3] = 255
  }
}

const logo = PNG.sync.read(fs.readFileSync(logoPath))

// Centered placement (slightly above center).
const x0 = Math.floor((W - logo.width) / 2)
const y0 = Math.floor((H - logo.height) / 2) - 10

// Simple shadow pass.
for (let y = 0; y < logo.height; y++) {
  for (let x = 0; x < logo.width; x++) {
    const sIdx = (logo.width * y + x) << 2
    const a = logo.data[sIdx + 3]
    if (a === 0) continue
    const dx = x0 + x + 10
    const dy = y0 + y + 10
    if (dx < 0 || dy < 0 || dx >= W || dy >= H) continue
    const dIdx = (W * dy + dx) << 2
    blendPixel(out, dIdx, 0, 0, 0, Math.round(a * 0.22))
  }
}

// Logo pass.
for (let y = 0; y < logo.height; y++) {
  for (let x = 0; x < logo.width; x++) {
    const sIdx = (logo.width * y + x) << 2
    const a = logo.data[sIdx + 3]
    if (a === 0) continue
    const dx = x0 + x
    const dy = y0 + y
    if (dx < 0 || dy < 0 || dx >= W || dy >= H) continue
    const dIdx = (W * dy + dx) << 2
    blendPixel(out, dIdx, logo.data[sIdx], logo.data[sIdx + 1], logo.data[sIdx + 2], a)
  }
}

fs.writeFileSync(outPath, PNG.sync.write(out))
