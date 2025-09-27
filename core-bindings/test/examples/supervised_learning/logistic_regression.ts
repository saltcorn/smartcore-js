import {
  dataset,
  trainTestSplitF64BigI64,
  R2I64,
  LogisticRegressionF64BigI64,
  LogisticRegressionParametersF64,
} from '../../../index.js'
import assert from 'assert'

export default () => {
  it('Logistic Regression', () => {
    let loadedDataset = dataset.breastCancer().loadDataset()
    let matrix = loadedDataset.denseMatrix()
    let y = loadedDataset.target
    let [, xTest, , yTest] = trainTestSplitF64BigI64(matrix, y, 0.2, true)
    let parameters = new LogisticRegressionParametersF64()
    let yHatLr = LogisticRegressionF64BigI64.fit(matrix, loadedDataset.target, parameters).predict(xTest)
    let r2 = new R2I64()
    let score = r2.getScore(yTest, yHatLr)
    assert(score)
  })
}
