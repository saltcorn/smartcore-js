import { dataset, trainTestSplitF32F32, MeanSquareErrorF32, LassoF32F32, LassoParameters } from '../../../index'
import assert from 'assert'

export default () => {
  it('Least Absolute Shrinkage and Selection Operator (LASSO)', () => {
    let bostonData = dataset.boston().loadDataset()
    let x = bostonData.denseMatrix()
    let y = bostonData.target
    let [, xTest, , yTest] = trainTestSplitF32F32(x, y, 0.2, true)
    let parameters = new LassoParameters()
    parameters.withAlpha(0.5)
    let yHat_lasso = LassoF32F32.fit(x, bostonData.target, parameters).predict(xTest)
    let meanSquareError = new MeanSquareErrorF32()
    let score = meanSquareError.getScore(yTest, yHat_lasso)
    assert(score)
  })
}
