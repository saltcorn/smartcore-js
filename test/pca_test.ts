// Use
//     $ yarn ts-node main.ts
// to run this file.

import { dataset, PcaParameters, F32Pca } from '../index'

let loadedDataset = dataset.digits().loadDataset()

console.log(`Number of samples: ${loadedDataset.numSamples}`)
console.log(`Number of features: ${loadedDataset.numFeatures}`)
console.log(`First 5 feature values: ${loadedDataset.data.slice(0, 5)}`)
console.log(`First 5 target values: ${loadedDataset.target.slice(0, 5)}`)

let matrix = loadedDataset.denseMatrix()
console.log('Done creating DenseMatrix')
let pca_params = new PcaParameters()
pca_params.withNComponents(2)

let pca = new F32Pca(matrix, pca_params)
console.log('Done creating F32Pca')
let matrix_tranformed = pca.transform(matrix)
console.log('Done transforming matrix')
matrix_tranformed.noop()
