import * as fs from 'fs'
import * as path from 'path'

interface Dataset {
  data: number[]
  target: number[]
  numSamples: number
  numFeatures: number
  featureNames: string[]
  targetNames: string[]
  description: string
}

interface DeserializeResult {
  x: number[]
  y: number[]
  numSamples: number
  numFeatures: number
}

export function loadDataset(): Dataset {
  try {
    // Read the binary file - adjust path as needed
    //const filePath = 'digits.xy' // or './digits.xy'
    const filePath = path.join(__dirname, 'digits.xy')
    const bytes = fs.readFileSync(filePath)

    const { x, y, numSamples, numFeatures } = deserializeData(bytes)

    return {
      data: x,
      target: y,
      numSamples,
      numFeatures,
      featureNames: ['sepal length (cm)', 'sepal width (cm)', 'petal length (cm)', 'petal width (cm)'],
      targetNames: ['setosa', 'versicolor', 'virginica'],
      description: 'Digits dataset: https://archive.ics.uci.edu/ml/datasets/Optical+Recognition+of+Handwritten+Digits',
    }
  } catch (error) {
    throw new Error(`Can't deserialize digits.xy. ${error}`)
  }
}

function deserializeData(bytes: Buffer): DeserializeResult {
  // Read num_features and num_samples from the first 16 bytes
  const numFeatures = bytes.readBigUInt64LE(0)
  const numSamples = bytes.readBigUInt64LE(8)

  // Convert BigInt to regular numbers (assuming they fit in JS number range)
  const numFeaturesNum = Number(numFeatures)
  const numSamplesNum = Number(numSamples)

  // Initialize arrays
  const x: number[] = new Array(numSamplesNum * numFeaturesNum)
  const y: number[] = new Array(numSamplesNum)

  // Start reading data after the header (16 bytes)
  let offset = 16

  // Read feature data (x values)
  for (let i = 0; i < numSamplesNum * numFeaturesNum; i++) {
    // Read 4 bytes as little-endian uint32, then convert to float32
    const bits = bytes.readUInt32LE(offset)
    const buffer = new ArrayBuffer(4)
    const view = new DataView(buffer)
    view.setUint32(0, bits, true) // true for little-endian
    x[i] = view.getFloat32(0, true)
    offset += 4
  }

  // Read target data (y values)
  for (let i = 0; i < numSamplesNum; i++) {
    const bits = bytes.readUInt32LE(offset)
    const buffer = new ArrayBuffer(4)
    const view = new DataView(buffer)
    view.setUint32(0, bits, true)
    y[i] = view.getFloat32(0, true)
    offset += 4
  }

  return {
    x,
    y,
    numSamples: numSamplesNum,
    numFeatures: numFeaturesNum,
  }
}

// Alternative version using async/await for file reading
export async function loadDatasetAsync(): Promise<Dataset> {
  try {
    const filePath = path.join(__dirname, 'digits.xy')
    const bytes = await fs.promises.readFile(filePath)

    const { x, y, numSamples, numFeatures } = deserializeData(bytes)

    return {
      data: x,
      target: y,
      numSamples,
      numFeatures,
      featureNames: ['sepal length (cm)', 'sepal width (cm)', 'petal length (cm)', 'petal width (cm)'],
      targetNames: ['setosa', 'versicolor', 'virginica'],
      description: 'Digits dataset: https://archive.ics.uci.edu/ml/datasets/Optical+Recognition+of+Handwritten+Digits',
    }
  } catch (error) {
    throw new Error(`Can't deserialize digits.xy. ${error}`)
  }
}

// Usage example:
// const dataset = loadDataset();
// console.log(`Loaded dataset with ${dataset.numSamples} samples and ${dataset.numFeatures} features`);
