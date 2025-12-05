import assert from 'assert'
import { linearModel, metrics, dataset } from '../../../../src-js/index.js'

const { LogisticRegression } = linearModel
const { accuracyScore } = metrics

export default () => {
  it('Logistic Regression', () => {
    let irisData = dataset.loadIris({ returnXY: true })
    if (!Array.isArray(irisData)) assert.fail('Expected irisData to be an Array.')
    const [x, y] = irisData
    let yHat = new LogisticRegression().fit(x, y).predict(x)
    let accuracy = accuracyScore(y, yHat, false)
    assert(accuracy)
  })
}
