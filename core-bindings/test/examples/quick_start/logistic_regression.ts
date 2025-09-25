import assert from 'assert'
import { dataset, AccuracyI64, BigLogisticRegressionF64I64, LogisticRegressionParametersF64 } from '../../../index.js'

export default () => {
  it('Logistic Regression', () => {
    let loadedData = dataset.iris().loadDataset()
    let x = loadedData.denseMatrix()
    let y = loadedData.target
    let params = new LogisticRegressionParametersF64()
    let yHat = BigLogisticRegressionF64I64.fit(x, y, params).predict(x)
    let accuracy = new AccuracyI64().getScore(y, yHat)
    assert(accuracy)
  })
}
