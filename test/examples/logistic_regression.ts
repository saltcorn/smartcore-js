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
    let [, xTest, , yTest] = trainTestSplitF32U32(matrix, y, 0.2, true)
    let parameters = new LogisticRegressionParametersF32()
    let yHatLr = LogisticRegressionF32U32.fit(matrix, loadedDataset.target, parameters).predict(xTest)
    let r2 = new R2U32()
    let score = r2.getScore(yTest, yHatLr)
    assert(score)
  })
}
