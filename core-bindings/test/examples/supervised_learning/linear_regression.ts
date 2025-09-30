import {
  dataset,
  trainTestSplitF64F64,
  MeanSquareErrorF64,
  LinearRegressionF64F64,
  LinearRegressionParameters,
} from '../../../index.js'
import assert from 'assert'

export default () => {
  it('Linear Regression', () => {
    let bostonData = dataset.boston().loadDataset()
    let x = bostonData.denseMatrix()
    let y = bostonData.target
    let [, xTest, , yTest] = trainTestSplitF64F64(x, y, 0.2, true)
    let parameters = new LinearRegressionParameters()
    let yHatLr = LinearRegressionF64F64.fit(x, bostonData.target, parameters).predict(xTest)
    let meanSquareError = new MeanSquareErrorF64()
    let score = meanSquareError.getScore(yTest, yHatLr)
    assert(score)
  })
}
