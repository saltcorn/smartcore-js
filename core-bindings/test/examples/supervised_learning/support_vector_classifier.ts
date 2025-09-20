import assert from 'assert'
import { AUCF32, dataset, SVCF32U32, SVCParametersF32U32, trainTestSplitF32U32 } from '../../../index'

export default () => {
  it.skip('Support Vector Classifier (SVC)', () => {
    let cancerData = dataset.breastCancer().loadDataset()
    let x = cancerData.denseMatrix()
    let y = cancerData.target
    let [, xTest, , yTest] = trainTestSplitF32U32(x, y, 0.2, true)
    let params = new SVCParametersF32U32()
    params.withC(10.0)
    let svm = SVCF32U32.setFitData(x, y, params)
    svm.fit()
    let yHatSVM = svm.predict(xTest)
    let auc = new AUCF32()
    // Failed to reproduce this example due to type mismatches.
    // yTest is of type Uint32Array
    // getScore expects Float32Array
    // let score = auc.getScore(yTest, yHatSVM)
    assert.fail('Irreproducible')
  })
}
