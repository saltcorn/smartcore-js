import {
  dataset,
  RidgeRegressionF32,
  RidgeRegressionParameters,
  trainTestSplitF32F32,
  MeanSquareErrorF32,
} from '../index'

let loadedDataset = dataset.boston().loadDataset()

let matrix = loadedDataset.denseMatrix()

let parameters = new RidgeRegressionParameters()
parameters.withAlpha(0.5)

let y = loadedDataset.target
let [, x_test, , y_test] = trainTestSplitF32F32(matrix, y, 0.2, true)
let y_hat_rr = RidgeRegressionF32.fit(matrix, loadedDataset.target, parameters).predict(x_test)
let mean_squared_error = new MeanSquareErrorF32()
let score = mean_squared_error.getScoreF32(y_test, y_hat_rr)
console.log('MSE Ridge Regression:', score)
