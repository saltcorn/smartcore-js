import {
  dataset,
  RidgeRegressionF32F32,
  RidgeRegressionParametersF32,
  trainTestSplitF32F32,
  MeanSquareErrorF32,
} from '../../../index'
import assert from 'assert'

export default () => {
  it('Ridge Regression', () => {
    let bostonData = dataset.boston().loadDataset()
    let x = bostonData.denseMatrix()
    let y = bostonData.target
    let parameters = new RidgeRegressionParametersF32()
    parameters.withAlpha(0.5)
    let [, xTest, , yTest] = trainTestSplitF32F32(x, y, 0.2, true)
    let yHatRr = RidgeRegressionF32F32.fit(x, bostonData.target, parameters).predict(xTest)
    let meanSquaredError = new MeanSquareErrorF32()
    let score = meanSquaredError.getScore(yTest, yHatRr)
    assert(score)
  })
}
