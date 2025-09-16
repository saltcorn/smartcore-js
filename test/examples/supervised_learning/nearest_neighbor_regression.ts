import { dataset, trainTestSplitF32F32, KNNRegressorF32F32, MeanSquareErrorF32 } from '../../../index'
import assert from 'assert'

export default () => {
  it('Nearest Neighbors Regression', () => {
    let bostonData = dataset.boston().loadDataset()
    let x = bostonData.denseMatrix()
    let y = bostonData.target
    let [, xTest, , yTest] = trainTestSplitF32F32(x, y, 0.2, true)
    let yHatKnn = KNNRegressorF32F32.fit(x, bostonData.target).predict(xTest)
    let meanSquareError = new MeanSquareErrorF32()
    let score = meanSquareError.getScore(yTest, yHatKnn)
    assert(score)
  })
}
