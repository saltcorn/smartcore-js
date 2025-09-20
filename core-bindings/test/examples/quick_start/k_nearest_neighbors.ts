import assert from 'assert'
import { dataset, KNNClassifierF64I64, AccuracyI64 } from '../../../index.js'

export default () => {
  it('K-Nearest Neigbors', () => {
    let loadedData = dataset.iris().loadDataset()
    let x = loadedData.denseMatrix()
    let y = loadedData.target
    let yHat = KNNClassifierF64I64.fit(x, y).predict(x)
    let accuracy = new AccuracyI64().getScore(y, yHat)
    assert(accuracy)
  })
}
