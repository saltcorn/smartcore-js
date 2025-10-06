import { writeFileSync } from 'fs'
import { mkdirSync } from 'fs'

try {
  mkdirSync('./dist-cjs', { recursive: true })
} catch (e) {
  // Don't throw if the directory already exists
}

writeFileSync('./dist-cjs/package.json', JSON.stringify({ type: 'commonjs' }, null, 2))
console.log('Created dist-cjs/package.json')
