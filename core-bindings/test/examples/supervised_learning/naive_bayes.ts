import { dataset, GaussianNBF64U64, GaussianNBParameters, AccuracyI64 } from '../../../index.js'
import assert from 'assert'

export default () => {
  it('Naive Bayes', () => {
    let irisData = dataset.iris().loadDataset()
    let x = irisData.denseMatrix()
    let y = irisData.target
    let gnb = GaussianNBF64U64.fit(x, new BigUint64Array(y), new GaussianNBParameters())
    let yHat = gnb.predict(x)
    let accuracy = new AccuracyI64().getScore(y, new BigInt64Array(yHat))
    assert(accuracy)
  })
}
