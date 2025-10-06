import {
  dataset,
  trainTestSplitF64BigI64,
  R2I64,
  KNNClassifierF64BigI64EuclidianF64,
  KNNClassifierF64EuclidianF64Parameters,
} from '../../../../src-js/core-bindings/index.js'
import assert from 'assert'

export default () => {
  it('Nearest Neighbors Classification', () => {
    let breastCancerData = dataset.breastCancer().loadDataset()
    let x = breastCancerData.denseMatrix()
    let y = breastCancerData.target
    let [, xTest, , yTest] = trainTestSplitF64BigI64(x, y, 0.2, true)
    let parameters = new KNNClassifierF64EuclidianF64Parameters()
    let yHatKnn = KNNClassifierF64BigI64EuclidianF64.fit(x, breastCancerData.target, parameters).predict(xTest)
    let r2 = new R2I64()
    let score = r2.getScore(yTest, yHatKnn)
    assert(score)
  })
}
