import { dataset, trainTestSplitF64F64, MeanSquareErrorF64, LassoF64F64, LassoParameters } from '../../../index.js'
import assert from 'assert'

export default () => {
  it('Least Absolute Shrinkage and Selection Operator (LASSO)', () => {
    let bostonData = dataset.boston().loadDataset()
    let x = bostonData.denseMatrix()
    let y = bostonData.target
    let [, xTest, , yTest] = trainTestSplitF64F64(x, y, 0.2, true)
    let parameters = new LassoParameters()
    parameters.withAlpha(0.5)
    let yHat_lasso = LassoF64F64.fit(x, bostonData.target, parameters).predict(xTest)
    let meanSquareError = new MeanSquareErrorF64()
    let score = meanSquareError.getScore(yTest, yHat_lasso)
    assert(score)
  })
}
