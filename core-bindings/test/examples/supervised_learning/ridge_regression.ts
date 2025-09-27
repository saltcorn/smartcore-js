import {
  dataset,
  RidgeRegressionF64F64,
  RidgeRegressionF64Parameters,
  trainTestSplitF64F64,
  MeanSquareErrorF64,
} from '../../../index.js'
import assert from 'assert'

export default () => {
  it('Ridge Regression', () => {
    let bostonData = dataset.boston().loadDataset()
    let x = bostonData.denseMatrix()
    let y = bostonData.target
    let parameters = new RidgeRegressionF64Parameters()
    parameters.withAlpha(0.5)
    let [, xTest, , yTest] = trainTestSplitF64F64(x, y, 0.2, true)
    let yHatRr = RidgeRegressionF64F64.fit(x, bostonData.target, parameters).predict(xTest)
    let meanSquaredError = new MeanSquareErrorF64()
    let score = meanSquaredError.getScore(yTest, yHatRr)
    assert(score)
  })
}
