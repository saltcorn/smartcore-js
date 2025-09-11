import { dataset, RidgeRegressionParametersF32, trainTestSplitF32U32, R2U32, KNNClassifierF32U32 } from '../../index'
import assert from 'assert'

export default () => {
  it('Nearest Neighbors Classification', () => {
    let loadedDataset = dataset.breastCancer().loadDataset()

    let matrix = loadedDataset.denseMatrix()

    let parameters = new RidgeRegressionParametersF32()
    parameters.withAlpha(0.5)

    let y = loadedDataset.target
    let [, x_test, , y_test] = trainTestSplitF32U32(matrix, y, 0.2, true)
    let y_hat_knn = KNNClassifierF32U32.fit(matrix, loadedDataset.target).predict(x_test)
    let r2 = new R2U32()
    let score = r2.getScore(y_test, y_hat_knn)
    assert(score)
  })
}
