import {
  dataset,
  trainTestSplitF32F32,
  MeanSquareErrorF32,
  LinearRegressionF32F32,
  LinearRegressionParameters,
} from '../../index'
import assert from 'assert'

export default () => {
  it('Linear Regression', () => {
    let loadedDataset = dataset.boston().loadDataset()
    let matrix = loadedDataset.denseMatrix()
    let y = loadedDataset.target
    let [, x_test, , y_test] = trainTestSplitF32F32(matrix, y, 0.2, true)
    let parameters = new LinearRegressionParameters()
    let y_hat_lr = LinearRegressionF32F32.fit(matrix, loadedDataset.target, parameters).predict(x_test)
    let mean_square_error = new MeanSquareErrorF32()
    let score = mean_square_error.getScore(y_test, y_hat_lr)
    assert(score)
  })
}
