import assert from 'assert'
import { dataset, KNNClassifierF32U32, AccuracyU32 } from '../../index'

export default () => {
  it('Iris Flower Classification', () => {
    let loadedData = dataset.iris().loadDataset()
    let x = loadedData.denseMatrix()
    let y = loadedData.target
    let y_hat = KNNClassifierF32U32.fit(x, y).predict(x)
    let accuracy = new AccuracyU32().getScore(y, y_hat)
    assert(accuracy)
  })
}
