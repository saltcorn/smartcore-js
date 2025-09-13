import { dataset, trainTestSplitF32F32, MeanSquareErrorF32, LassoF32F32, LassoParameters } from '../../index'
import assert from 'assert'

export default () => {
  it('Least Absolute Shrinkage and Selection Operator (LASSO)', () => {
    let loadedDataset = dataset.boston().loadDataset()
    let matrix = loadedDataset.denseMatrix()
    let y = loadedDataset.target
    let [, xTest, , yTest] = trainTestSplitF32F32(matrix, y, 0.2, true)
    let parameters = new LassoParameters()
    parameters.withAlpha(0.5)
    let yHat_lasso = LassoF32F32.fit(matrix, loadedDataset.target, parameters).predict(xTest)
    let meanSquareError = new MeanSquareErrorF32()
    let score = meanSquareError.getScore(yTest, yHat_lasso)
    assert(score)
  })
}
