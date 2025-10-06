import assert from 'assert'
import {
  AUCF64,
  dataset,
  SVCF64I64,
  SVCParametersF64I64,
  trainTestSplitF64BigI64,
} from '../../../../src-js/core-bindings/index.js'

export default () => {
  it.skip('Support Vector Classifier (SVC)', () => {
    let cancerData = dataset.breastCancer().loadDataset()
    let x = cancerData.denseMatrix()
    let y = cancerData.target
    let [, xTest, , yTest] = trainTestSplitF64BigI64(x, y, 0.2, true)
    let params = new SVCParametersF64I64()
    params.withC(10.0)
    let svm = SVCF64I64.setFitData(x, y, params)
    svm.fit()
    let yHatSVM = svm.predict(xTest)
    let auc = new AUCF64()
    // Failed to reproduce this example due to type mismatches.
    // yTest is of type Uint32Array
    // getScore expects Float32Array
    // let score = auc.getScore(yTest, yHatSVM)
    assert.fail('Irreproducible')
  })
}
