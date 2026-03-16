import fs from 'node:fs'
import { PNG } from 'pngjs'

const inputPath = process.argv[2]
const outputPath = process.argv[3]

if (!inputPath || !outputPath) {
  console.error('Usage: node scripts/makeTransparentPng.mjs <in.png> <out.png>')
  process.exit(2)
}

const buf = fs.readFileSync(inputPath)
const png = PNG.sync.read(buf)

for (let y = 0; y < png.height; y++) {
  for (let x = 0; x < png.width; x++) {
    const idx = (png.width * y + x) << 2
    const r = png.data[idx]
    const g = png.data[idx + 1]
    const b = png.data[idx + 2]

    const dr = 255 - r
    const dg = 255 - g
    const db = 255 - b
    const dist = Math.sqrt(dr * dr + dg * dg + db * db)

    // Key out near-white background with soft edges.
    const hard = 18
    const soft = 50
    if (dist <= hard) {
      png.data[idx + 3] = 0
    } else if (dist < soft) {
      const a = Math.round(((dist - hard) / (soft - hard)) * 255)
      png.data[idx + 3] = Math.min(png.data[idx + 3], a)
    }
  }
}

fs.writeFileSync(outputPath, PNG.sync.write(png))
