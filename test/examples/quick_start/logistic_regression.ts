import assert from 'assert'
import { dataset, AccuracyU32, LogisticRegressionF32U32, LogisticRegressionParametersF32 } from '../../../index'

export default () => {
  it('Iris Flower Classification - Logistic Regression', () => {
    let loadedData = dataset.iris().loadDataset()
    let x = loadedData.denseMatrix()
    let y = loadedData.target
    let params = new LogisticRegressionParametersF32()
    let yHat = LogisticRegressionF32U32.fit(x, y, params).predict(x)
    let accuracy = new AccuracyU32().getScore(y, yHat)
    assert(accuracy)
  })
}
