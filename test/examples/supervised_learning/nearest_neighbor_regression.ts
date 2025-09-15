import {
  dataset,
  RidgeRegressionParametersF32,
  trainTestSplitF32F32,
  KNNRegressorF32F32,
  MeanSquareErrorF32,
} from '../../../index'
import assert from 'assert'

export default () => {
  it('Nearest Neighbors Regression', () => {
    let loadedDataset = dataset.boston().loadDataset()

    let matrix = loadedDataset.denseMatrix()

    let parameters = new RidgeRegressionParametersF32()
    parameters.withAlpha(0.5)

    let y = loadedDataset.target
    let [, xTest, , yTest] = trainTestSplitF32F32(matrix, y, 0.2, true)
    let yHatKnn = KNNRegressorF32F32.fit(matrix, loadedDataset.target).predict(xTest)
    let meanSquareError = new MeanSquareErrorF32()
    let score = meanSquareError.getScore(yTest, yHatKnn)
    assert(score)
  })
}
