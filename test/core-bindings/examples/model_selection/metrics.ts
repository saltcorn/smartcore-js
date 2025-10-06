import assert from 'assert'
import { AccuracyF64 } from '../../../../src-js/core-bindings/index.js'

export default () => {
  it('Metrics - How to calculate the accuracy of your results', () => {
    let yPred = new Float64Array([0, 2, 1, 3])
    let yTrue = new Float64Array([0, 1, 2, 3])
    let accuracy = new AccuracyF64()
    let accuracyResult = accuracy.getScore(yPred, yTrue)
    assert(accuracyResult)
  })
}
