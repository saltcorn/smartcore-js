import {
  dataset,
  trainTestSplitF32U32,
  DecisionTreeClassifierU32U32,
  DecisionTreeClassifierParameters,
  R2U32,
} from '../../index'
import assert from 'assert'

export default () => {
  it('Decision Tree Classifier', () => {
    let breastCancerData = dataset.breastCancer().loadDataset()
    let x = breastCancerData.denseMatrix()
    let y = breastCancerData.target
    let [, xTest, , yTest] = trainTestSplitF32U32(x, y, 0.2, true)
    let yHatTree = DecisionTreeClassifierU32U32.fit(
      x,
      breastCancerData.target,
      new DecisionTreeClassifierParameters(),
    ).predict(xTest)
    let r2 = new R2U32()
    let score = r2.getScore(yTest, yHatTree)
    assert(score)
  })
}
