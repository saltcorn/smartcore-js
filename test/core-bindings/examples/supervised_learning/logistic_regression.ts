import assert from 'assert'
import { dataset, metrics, linearModel, modelSelection } from '../../../../src-js/index.js'

const { trainTestSplit } = modelSelection
const { r2 } = metrics
const { LogisticRegression } = linearModel

export default () => {
  it('Logistic Regression', () => {
    let breastCancerData = dataset.loadBreastCancer({ returnXY: true })
    if (!Array.isArray(breastCancerData)) assert.fail('Expected breastCancerData to be an Array')
    const [x, y] = breastCancerData
    let [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.2, shuffle: true })
    let yHatLr = new LogisticRegression().fit(x, y).predict(xTest)
    let score = r2(yTest, yHatLr)
    assert(score)
  })
}
