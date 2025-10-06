import assert from 'assert'
import {
  dataset,
  AccuracyI64,
  LogisticRegressionF64BigI64,
  LogisticRegressionParametersF64,
} from '../../../../src-js/core-bindings/index.js'

export default () => {
  it('Logistic Regression', () => {
    let loadedData = dataset.iris().loadDataset()
    let x = loadedData.denseMatrix()
    let y = loadedData.target
    let params = new LogisticRegressionParametersF64()
    let yHat = LogisticRegressionF64BigI64.fit(x, y, params).predict(x)
    let accuracy = new AccuracyI64().getScore(y, yHat)
    assert(accuracy)
  })
}
