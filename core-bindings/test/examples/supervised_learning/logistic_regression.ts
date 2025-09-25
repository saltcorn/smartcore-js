import {
  dataset,
  trainTestSplitF64I64,
  R2I64,
  BigLogisticRegressionF64I64,
  LogisticRegressionParametersF64,
} from '../../../index.js'
import assert from 'assert'

export default () => {
  it('Logistic Regression', () => {
    let loadedDataset = dataset.breastCancer().loadDataset()
    let matrix = loadedDataset.denseMatrix()
    let y = loadedDataset.target
    let [, xTest, , yTest] = trainTestSplitF64I64(matrix, y, 0.2, true)
    let parameters = new LogisticRegressionParametersF64()
    let yHatLr = BigLogisticRegressionF64I64.fit(matrix, loadedDataset.target, parameters).predict(xTest)
    let r2 = new R2I64()
    let score = r2.getScore(yTest, yHatLr)
    assert(score)
  })
}
