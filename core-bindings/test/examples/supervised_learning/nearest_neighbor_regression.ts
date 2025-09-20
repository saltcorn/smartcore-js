import { dataset, trainTestSplitF64F64, KNNRegressorF64F64, MeanSquareErrorF64 } from '../../../index.js'
import assert from 'assert'

export default () => {
  it('Nearest Neighbors Regression', () => {
    let bostonData = dataset.boston().loadDataset()
    let x = bostonData.denseMatrix()
    let y = bostonData.target
    let [, xTest, , yTest] = trainTestSplitF64F64(x, y, 0.2, true)
    let yHatKnn = KNNRegressorF64F64.fit(x, bostonData.target).predict(xTest)
    let meanSquareError = new MeanSquareErrorF64()
    let score = meanSquareError.getScore(yTest, yHatKnn)
    assert(score)
  })
}
