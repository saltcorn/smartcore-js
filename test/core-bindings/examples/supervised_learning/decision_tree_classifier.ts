import assert from 'assert'
import { tree, dataset, modelSelection, metrics } from '../../../../src-js/index.js'

const { r2Score } = metrics
const { trainTestSplit } = modelSelection
const { DecisionTreeClassifier } = tree

export default () => {
  it('Decision Tree Classifier', () => {
    const breastCancerData = dataset.loadBreastCancer({ returnXY: true })
    if (!Array.isArray(breastCancerData)) assert.fail('Expected breastCancerData to be an Array')
    const [x, y] = breastCancerData
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.2, shuffle: true })
    const yHatTree = new DecisionTreeClassifier().fit(x, y).predict(xTest)
    const score = r2Score(yTest, yHatTree)
    assert(score)
  })
}
