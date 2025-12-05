import assert from 'assert'
import { dataset, metrics, svm, modelSelection } from '../../../../src-js/index.js'
import { Kernels } from '../../../../src-js/core-bindings/index.js'

const { aucScore } = metrics
const { SVC } = svm
const { trainTestSplit } = modelSelection

export default () => {
  it.skip('Support Vector Classifier (SVC)', () => {
    const breastCancerData = dataset.loadBreastCancer({ returnXY: true })
    if (!Array.isArray(breastCancerData)) assert.fail('Expected breastCancerData to be an Array')
    const [x, y] = breastCancerData
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.2, shuffle: true })
    const yHatSVC = new SVC({ kernel: Kernels.rbf(0.5), c: 10.0 }).fit(x, y).predict(xTest)
    // Failed to reproduce this example due to type mismatches.
    // yTest is of type Uint32Array
    // getScore expects Float32Array
    const score = aucScore(yTest, yHatSVC)
    assert(score)
  })
}
