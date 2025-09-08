// Use
//     $ yarn ts-node main.ts
// to run this file.

import { F64DenseMatrix, PcaParameters, F64Pca } from '../index'

import { loadDataset } from './load_dataset'

let dataset = loadDataset()

console.log(`Number of samples: ${dataset.numSamples}`)
console.log(`Number of features: ${dataset.numFeatures}`)
console.log(`First 5 feature values: ${dataset.data.slice(0, 5)}`)
console.log(`First 5 target values: ${dataset.target.slice(0, 5)}`)

let xs = new Float64Array(dataset.data.length)
for (let i = 0; i < dataset.data.length; i++) {
  xs[i] = dataset.data[i]
}
let matrix = new F64DenseMatrix(dataset.numSamples, dataset.numFeatures, xs)
let pca_params = new PcaParameters()
pca_params.withNComponents(2)

let pca = new F64Pca(matrix, pca_params)
let matrix_tranformed = pca.transform(matrix)
matrix_tranformed.noop()
