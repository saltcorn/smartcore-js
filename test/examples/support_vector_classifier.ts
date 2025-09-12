import { dataset, trainTestSplitF32U32, R2U32, SVCF32U32, SVCParametersF32U32 } from '../../index'
import assert from 'assert'

export default () => {
  it('Support Vector Classifier (SVC)', () => {
    let loadedDataset = dataset.breastCancer().loadDataset()
    let matrix = loadedDataset.denseMatrix()
    let y = loadedDataset.target
    let [, x_test, , y_test] = trainTestSplitF32U32(matrix, y, 0.2, true)
    let parameters = new SVCParametersF32U32()
    let svcF32U32 = SVCF32U32.setFitData(matrix, loadedDataset.target, parameters)
    svcF32U32.fit()
    let y_hat_svm = svcF32U32.predict(x_test)
    let r2 = new R2U32()
    let score = r2.getScore(y_test, y_hat_svm)
    assert(score)
  })
}
