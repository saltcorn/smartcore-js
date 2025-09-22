import {
  dataset,
  trainTestSplitF32F32,
  MeanSquareErrorF32,
  LinearRegressionF32F32,
  LinearRegressionParameters,
} from '../../../index'
import assert from 'assert'

export default () => {
  it('Linear Regression', () => {
    let bostonData = dataset.boston().loadDataset()
    let x = bostonData.denseMatrix()
    let y = bostonData.target
    let [, xTest, , yTest] = trainTestSplitF32F32(x, y, 0.2, true)
    let parameters = new LinearRegressionParameters()
    let yHatLr = LinearRegressionF32F32.fit(x, bostonData.target, parameters).predict(xTest)
    let meanSquareError = new MeanSquareErrorF32()
    let score = meanSquareError.getScore(yTest, yHatLr)
    assert(score)
  })
}
