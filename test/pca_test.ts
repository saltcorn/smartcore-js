// Use
//     $ yarn ts-node main.ts
// to run this file.

import { dataset, PcaParameters, F32Pca, F32DenseMatrix } from '../index'

let loadedDataset = dataset.digits().loadDataset()

console.log(`Number of samples: ${loadedDataset.numSamples}`)
console.log(`Number of features: ${loadedDataset.numFeatures}`)
console.log(`First 5 feature values: ${loadedDataset.data.slice(0, 5)}`)
console.log(`First 5 target values: ${loadedDataset.target.slice(0, 5)}`)

let xs = new Float64Array(loadedDataset.data.length)
for (let i = 0; i < loadedDataset.data.length; i++) {
  xs[i] = loadedDataset.data[i]
}
let matrix = new F32DenseMatrix(loadedDataset.numSamples, loadedDataset.numFeatures, loadedDataset.data)
let pca_params = new PcaParameters()
pca_params.withNComponents(2)

let pca = new F32Pca(matrix, pca_params)
let matrix_tranformed = pca.transform(matrix)
matrix_tranformed.noop()
