import assert from 'assert'
import path from 'path'
import fs from 'fs'
import os from 'os'
import {
  dataset,
  AccuracyI64,
  KNNClassifierF64BigI64EuclidianF64,
  KNNClassifierF64EuclidianF64Parameters,
} from '../../../index.js'

export default () => {
  it('Model Persistence', () => {
    let irisData = dataset.iris().loadDataset()
    let x = irisData.denseMatrix()
    let y = irisData.target
    let parameters = new KNNClassifierF64EuclidianF64Parameters()
    let knn = KNNClassifierF64BigI64EuclidianF64.fit(x, y, parameters)
    let filename = path.join(os.tmpdir(), 'iris_knn.model')
    // save the model
    let knnBytes = knn.serialize()
    fs.writeFileSync(filename, knnBytes)
    // load the model
    knnBytes = fs.readFileSync(filename)
    knn = KNNClassifierF64BigI64EuclidianF64.deserialize(knnBytes)
    // predict class labels
    let yHat = knn.predict(x)
    let accuracy = new AccuracyI64()
    let score = accuracy.getScore(y, yHat)
    assert(score)
  })
}
