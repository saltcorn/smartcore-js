import assert from 'assert'
import {
  dataset,
  Kernels,
  MeanSquareErrorF64,
  SVRF64,
  SVRParametersF64,
  trainTestSplitF64BigI64,
} from '../../../../src-js/core-bindings/index.js'

export default () => {
  it.skip('Support Vector Regressor (SVR)', () => {
    let diabetesData = dataset.diabetes().loadDataset()
    let x = diabetesData.denseMatrix()
    let y = diabetesData.target
    let [, xTest, , yTest] = trainTestSplitF64BigI64(x, y, 0.2, true)
    let params = new SVRParametersF64()
    params.withKernel(Kernels.rbf(0.5))
    params.withC(2000.0)
    params.withEps(10.0)
    // Failed to reproduce: y expects Uint32Array but is Float32Array
    // let svm = SVRF64.setFitData(x, y, params)
    // svm.fit()
    // let yHatSVM = svm.predict(xTest)
    let meanSquareError = new MeanSquareErrorF64()
    // Failed to reproduce: yTest expects Float32Array but is Uint32Array
    // let score = meanSquareError.getScore(yTest, yHatSVM)
    assert.fail('Irreproducible')
  })
}
