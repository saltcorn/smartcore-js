import assert from 'assert'
import {
  dataset,
  KNNClassifierF64BigI64EuclidianF64,
  AccuracyI64,
  KNNClassifierF64EuclidianF64Parameters,
} from '../../../../src-js/core-bindings/index.js'

export default () => {
  it('K-Nearest Neigbors', () => {
    let loadedData = dataset.iris().loadDataset()
    let x = loadedData.denseMatrix()
    let y = loadedData.target
    let parameters = new KNNClassifierF64EuclidianF64Parameters()
    let yHat = KNNClassifierF64BigI64EuclidianF64.fit(x, y, parameters).predict(x)
    let accuracy = new AccuracyI64().getScore(y, yHat)
    assert(accuracy)
  })
}
