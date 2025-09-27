import {
  dataset,
  trainTestSplitF64F64,
  MeanSquareErrorF64,
  ElasticNetF64F64,
  ElasticNetParameters,
} from '../../../index.js'
import assert from 'assert'

export default () => {
  it('Elastic Net', () => {
    let loadedDataset = dataset.boston().loadDataset()
    let matrix = loadedDataset.denseMatrix()
    let y = loadedDataset.target
    let [, xTest, , yTest] = trainTestSplitF64F64(matrix, y, 0.2, true)
    let parameters = new ElasticNetParameters()
    parameters.withAlpha(0.5)
    parameters.withL1Ratio(0.5)
    let yHatEn = ElasticNetF64F64.fit(matrix, loadedDataset.target, parameters).predict(xTest)
    let meanSquareError = new MeanSquareErrorF64()
    let score = meanSquareError.getScore(yTest, yHatEn)
    assert(score)
  })
}
