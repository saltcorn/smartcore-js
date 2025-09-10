import {
  dataset,
  RidgeRegressionf32F32,
  RidgeRegressionParametersf32,
  trainTestSplitF32F32,
  MeanSquareErrorF32,
} from '../../index'
import assert from 'assert'

export default () => {
  it('Ridge Regression', () => {
    let loadedDataset = dataset.boston().loadDataset()

    let matrix = loadedDataset.denseMatrix()

    let parameters = new RidgeRegressionParametersf32()
    parameters.withAlpha(0.5)

    let y = loadedDataset.target
    let [, x_test, , y_test] = trainTestSplitF32F32(matrix, y, 0.2, true)
    let y_hat_rr = RidgeRegressionf32F32.fit(matrix, loadedDataset.target, parameters).predict(x_test)
    let mean_squared_error = new MeanSquareErrorF32()
    let score = mean_squared_error.getScoreF32(y_test, y_hat_rr)
    assert(score)
  })
}
