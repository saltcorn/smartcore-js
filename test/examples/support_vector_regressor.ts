import assert from 'assert'
import { dataset, Kernels, MeanSquareErrorF32, SVRF32, SVRParametersF32, trainTestSplitF32U32 } from '../../index'

export default () => {
  it.skip('Support Vector Regressor (SVR)', () => {
    let diabetesData = dataset.diabetes().loadDataset()
    let x = diabetesData.denseMatrix()
    let y = diabetesData.target
    let [, xTest, , yTest] = trainTestSplitF32U32(x, y, 0.2, true)
    let params = new SVRParametersF32()
    params.withKernel(Kernels.rbf(0.5))
    params.withC(2000.0)
    params.withEps(10.0)
    // Failed to reproduce: y expects Uint32Array but is Float32Array
    // let svm = SVRF32.setFitData(x, y, params)
    // svm.fit()
    // let yHatSVM = svm.predict(xTest)
    let mean_square_error = new MeanSquareErrorF32()
    // Failed to reproduce: yTest expects Float32Array but is Uint32Array
    // let score = mean_square_error.getScore(yTest, yHatSVM)
    assert.fail('Irreproducible')
  })
}
