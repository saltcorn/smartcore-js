import {
  dataset,
  trainTestSplitF32U32,
  R2U32,
  LogisticRegressionF32U32,
  LogisticRegressionParametersF32,
} from '../../index'
import assert from 'assert'

export default () => {
  it('Logistic Regression', () => {
    let loadedDataset = dataset.breastCancer().loadDataset()
    let matrix = loadedDataset.denseMatrix()
    let y = loadedDataset.target
    let [, x_test, , y_test] = trainTestSplitF32U32(matrix, y, 0.2, true)
    let parameters = new LogisticRegressionParametersF32()
    let y_hat_lr = LogisticRegressionF32U32.fit(matrix, loadedDataset.target, parameters).predict(x_test)
    let r2 = new R2U32()
    let score = r2.getScore(y_test, y_hat_lr)
    assert(score)
  })
}
