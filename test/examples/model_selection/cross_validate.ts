import assert from 'assert'
import {
  dataset,
  crossValidateLogisticRegressionF32U32,
  LogisticRegressionParametersF32,
  KFold,
  AccuracyU32,
} from '../../../index'

export default () => {
  it('Cross Validate - Model performance evaluation using k-fold CV', () => {
    let breastCancerData = dataset.breastCancer().loadDataset()
    let x = breastCancerData.denseMatrix()
    let y = breastCancerData.target
    let accuracy = new AccuracyU32()
    let score = (a: Uint32Array, b: Uint32Array) => {
      return accuracy.getScore(a, b)
    }
    let results = crossValidateLogisticRegressionF32U32(x, y, new LogisticRegressionParametersF32(), new KFold(), score)
    assert(results.meanTestScore())
    assert(results.meanTrainScore())
  })
}
