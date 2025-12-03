import assert from 'assert'
import { metrics } from '../../../../src-js/index.js'

const { accuracyScore } = metrics

export default () => {
  it('Metrics - How to calculate the accuracy of your results', () => {
    let yPred = new Float64Array([0, 2, 1, 3])
    let yTrue = new Float64Array([0, 1, 2, 3])
    let accuracyResult = accuracyScore(yPred, yTrue)
    assert(accuracyResult)
  })
}
