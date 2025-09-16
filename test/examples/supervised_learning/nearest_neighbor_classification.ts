import { dataset, trainTestSplitF32U32, R2U32, KNNClassifierF32U32 } from '../../../index'
import assert from 'assert'

export default () => {
  it('Nearest Neighbors Classification', () => {
    let breastCancerData = dataset.breastCancer().loadDataset()
    let x = breastCancerData.denseMatrix()
    let y = breastCancerData.target
    let [, xTest, , yTest] = trainTestSplitF32U32(x, y, 0.2, true)
    let yHatKnn = KNNClassifierF32U32.fit(x, breastCancerData.target).predict(xTest)
    let r2 = new R2U32()
    let score = r2.getScore(yTest, yHatKnn)
    assert(score)
  })
}
