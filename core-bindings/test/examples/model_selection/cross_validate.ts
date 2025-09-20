import assert from 'assert'
import {
  dataset,
  crossValidateLogisticRegressionF64I64,
  LogisticRegressionParametersF64,
  KFold,
  AccuracyI64,
} from '../../../index.js'

export default () => {
  it('Cross Validate - Model performance evaluation using k-fold CV', () => {
    let breastCancerData = dataset.breastCancer().loadDataset()
    let x = breastCancerData.denseMatrix()
    let y = breastCancerData.target
    let accuracy = new AccuracyI64()
    let score = (a: BigInt64Array, b: BigInt64Array) => {
      return accuracy.getScore(a, b)
    }
    let results = crossValidateLogisticRegressionF64I64(x, y, new LogisticRegressionParametersF64(), new KFold(), score)
    assert(results.meanTestScore())
    assert(results.meanTrainScore())
  })
}
