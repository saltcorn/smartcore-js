import assert from 'assert'
import { dataset, modelSelection, svm, metrics } from '../../../../src-js/index.js'

const { Kernels, SVR } = svm
const { meanSquaredError } = metrics
const { trainTestSplit } = modelSelection

export default () => {
  it.skip('Support Vector Regressor (SVR)', () => {
    const diabetesData = dataset.loadDiabetes({ returnXY: true })
    if (!Array.isArray(diabetesData)) assert.fail('Expected diabetesData to be an Array')
    const [x, y] = diabetesData
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.2, shuffle: true })
    // Failed to reproduce: y expects Uint32Array but is Float32Array
    const svr = new SVR({ kernel: Kernels.rbf(0.5), c: 2000.0, eps: 10.0 }).fit(x, y)
    const yHatSVM = svr.predict(xTest)
    // Failed to reproduce: yTest expects Float32Array but is Uint32Array
    const score = meanSquaredError(yTest, yHatSVM)
    assert.fail('Irreproducible')
  })
}
