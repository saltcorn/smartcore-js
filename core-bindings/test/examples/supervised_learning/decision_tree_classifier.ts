import {
  dataset,
  trainTestSplitF64BigI64,
  DecisionTreeClassifierI64I64,
  DecisionTreeClassifierParameters,
  R2I64,
} from '../../../index.js'
import assert from 'assert'

export default () => {
  it('Decision Tree Classifier', () => {
    let breastCancerData = dataset.breastCancer().loadDataset()
    let x = breastCancerData.denseMatrix()
    let y = breastCancerData.target
    let [, xTest, , yTest] = trainTestSplitF64BigI64(x, y, 0.2, true)
    let yHatTree = DecisionTreeClassifierI64I64.fit(
      x,
      breastCancerData.target,
      new DecisionTreeClassifierParameters(),
    ).predict(xTest)
    let r2 = new R2I64()
    let score = r2.getScore(yTest, yHatTree)
    assert(score)
  })
}
