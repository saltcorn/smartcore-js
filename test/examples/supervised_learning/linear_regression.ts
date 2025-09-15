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
    let loadedDataset = dataset.boston().loadDataset()
    let matrix = loadedDataset.denseMatrix()
    let y = loadedDataset.target
    let [, xTest, , yTest] = trainTestSplitF32F32(matrix, y, 0.2, true)
    let parameters = new LinearRegressionParameters()
    let yHatLr = LinearRegressionF32F32.fit(matrix, loadedDataset.target, parameters).predict(xTest)
    let meanSquareError = new MeanSquareErrorF32()
    let score = meanSquareError.getScore(yTest, yHatLr)
    assert(score)
  })
}
