import {
  dataset,
  trainTestSplitF64F64,
  KNNRegressorF64F64EuclidianF64,
  KNNRegressorF64EuclidianF64Parameters,
  MeanSquareErrorF64,
} from '../../../../src-js/core-bindings/index.js'
import assert from 'assert'

export default () => {
  it('Nearest Neighbors Regression', () => {
    let bostonData = dataset.boston().loadDataset()
    let x = bostonData.denseMatrix()
    let y = bostonData.target
    let [, xTest, , yTest] = trainTestSplitF64F64(x, y, 0.2, true)
    let parameters = new KNNRegressorF64EuclidianF64Parameters()
    let yHatKnn = KNNRegressorF64F64EuclidianF64.fit(x, bostonData.target, parameters).predict(xTest)
    let meanSquareError = new MeanSquareErrorF64()
    let score = meanSquareError.getScore(yTest, yHatKnn)
    assert(score)
  })
}
