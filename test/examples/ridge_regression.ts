import {
  dataset,
  RidgeRegressionF32F32,
  RidgeRegressionParametersF32,
  trainTestSplitF32F32,
  MeanSquareErrorF32,
} from '../../index'
import assert from 'assert'

export default () => {
  it('Ridge Regression', () => {
    let loadedDataset = dataset.boston().loadDataset()

    let matrix = loadedDataset.denseMatrix()

    let parameters = new RidgeRegressionParametersF32()
    parameters.withAlpha(0.5)

    let y = loadedDataset.target
    let [, xTest, , yTest] = trainTestSplitF32F32(matrix, y, 0.2, true)
    let yHatRr = RidgeRegressionF32F32.fit(matrix, loadedDataset.target, parameters).predict(xTest)
    let meanSquaredError = new MeanSquareErrorF32()
    let score = meanSquaredError.getScore(yTest, yHatRr)
    assert(score)
  })
}
