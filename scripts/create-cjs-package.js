import { readdirSync, statSync, existsSync, mkdirSync, copyFileSync } from 'fs'
import { writeFileSync } from 'fs'
import path from 'path'

function copyFolderSync(src, dest) {
  const absSrc = path.resolve(src)
  const absDest = path.resolve(dest)

  console.log(`Copying: '${absSrc}'`)
  console.log(`To: '${absSrc}'`)

  if (!existsSync(absDest)) {
    mkdirSync(absDest, { recursive: true })
  }

  const files = readdirSync(absSrc)

  for (const file of files) {
    const srcPath = path.join(absSrc, file)
    const destPath = path.join(absDest, file)
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

copyFolderSync('./core-bindings/esm/', './src-js/core-bindings/')
console.log("Copied the auto-generated ESM 'core-bindings' folder into the 'src-js' folder.\n")

copyFolderSync('./core-bindings/esm/', './dist/core-bindings/')
console.log("Copied the auto-generated ESM 'core-bindings' folder into the 'dist' folder.\n")

copyFolderSync('./core-bindings/cjs/', './dist-cjs/core-bindings/')
console.log("Copied the auto-generated CommonJS 'core-bindings' folder into the 'dist-cjs' folder.\n")
