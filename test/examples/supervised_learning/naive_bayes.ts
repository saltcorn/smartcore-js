import { dataset, GausianNBF32U32, GaussianNBParameters, AccuracyU32 } from '../../../index'
import assert from 'assert'

export default () => {
  it('Naive Bayes', () => {
    let irisData = dataset.iris().loadDataset()
    let x = irisData.denseMatrix()
    let y = irisData.target
    let gnb = GausianNBF32U32.fit(x, y, new GaussianNBParameters())
    let yHat = gnb.predict(x)
    let accuracy = new AccuracyU32().getScore(y, yHat)
    assert(accuracy)
  })
}
