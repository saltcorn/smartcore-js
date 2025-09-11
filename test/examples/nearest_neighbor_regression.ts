import {
  dataset,
  RidgeRegressionParametersF32,
  trainTestSplitF32F32,
  KNNRegressorF32F32,
  MeanSquareErrorF32,
} from '../../index'
import assert from 'assert'

export default () => {
  it('Nearest Neighbors Regression', () => {
    let loadedDataset = dataset.boston().loadDataset()

    let matrix = loadedDataset.denseMatrix()

    let parameters = new RidgeRegressionParametersF32()
    parameters.withAlpha(0.5)

    let y = loadedDataset.target
    let [, x_test, , y_test] = trainTestSplitF32F32(matrix, y, 0.2, true)
    let y_hat_knn = KNNRegressorF32F32.fit(matrix, loadedDataset.target).predict(x_test)
    let mean_square_error = new MeanSquareErrorF32()
    let score = mean_square_error.getScore(y_test, y_hat_knn)
    assert(score)
  })
}
