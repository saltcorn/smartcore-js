import { assert } from 'console'
import { AccuracyF32 } from '../../../index'

export default () => {
  it('Metrics - How to calculate the accuracy of your results', () => {
    let yPred = new Float32Array([0, 2, 1, 3])
    let yTrue = new Float32Array([0, 1, 2, 3])
    let accuracy = new AccuracyF32()
    let accuracyResult = accuracy.getScore(yPred, yTrue)
    assert(accuracyResult)
  })
}
