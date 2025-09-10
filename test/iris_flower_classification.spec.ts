import assert from 'assert'
import { dataset, KnnClassifierf32U32, Accuracyu32 } from '../index'

describe('Iris Flower Classification', () => {
  it('example runs with no errors', () => {
    let loadedData = dataset.iris().loadDataset()
    let x = loadedData.denseMatrix()
    let y = loadedData.target
    let y_hat = KnnClassifierf32U32.fit(x, y).predict(x)
    let accuracy = new Accuracyu32().getScore(y, y_hat)
    assert(accuracy)
  })
})
