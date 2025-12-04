import assert from 'assert'
import { dataset, naiveBayes, metrics } from '../../../../src-js/index.js'

const { GaussianNB } = naiveBayes
const { accuracyScore } = metrics

export default () => {
  it('Naive Bayes', () => {
    const irisData = dataset.loadIris({ returnXY: true })
    if (!Array.isArray(irisData)) assert.fail('Expected irisData to be an array')
    const [x, y] = irisData
    const yHat = new GaussianNB().fit(x, y).predict(x)
    let accuracy = accuracyScore(y, yHat, false)
    assert(accuracy)
  })
}
