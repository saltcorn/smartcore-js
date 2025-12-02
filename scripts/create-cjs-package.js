import { readdirSync, statSync, existsSync, mkdirSync, copyFileSync } from 'fs'
import { writeFileSync } from 'fs'
import path from 'path'

function copyFolderSync(src, dest) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true })
  }

  const files = readdirSync(src)

  for (const file of files) {
    const srcPath = path.join(src, file)
    const destPath = path.join(dest, file)
    const stat = statSync(srcPath)

    if (stat.isDirectory()) {
      copyFolderSync(srcPath, destPath)
    } else {
      copyFileSync(srcPath, destPath)
    }
  }
}

try {
  mkdirSync('./dist-cjs', { recursive: true })
} catch (e) {
  // Don't throw if the directory already exists
}

writeFileSync('./dist-cjs/package.json', JSON.stringify({ type: 'commonjs' }, null, 2))
console.log('Created dist-cjs/package.json')
copyFolderSync('./src-js/core-bindings/', './dist-cjs/core-bindings/')
console.log("Copied the auto-generated 'core-bindings' folder into the 'dist-cjs' folder.")
