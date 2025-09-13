import { dataset, trainTestSplitF32F32, MeanSquareErrorF32, ElasticNetF32F32, ElasticNetParameters } from '../../index'
import assert from 'assert'

export default () => {
  it('Elastic Net', () => {
    let loadedDataset = dataset.boston().loadDataset()
    let matrix = loadedDataset.denseMatrix()
    let y = loadedDataset.target
    let [, xTest, , yTest] = trainTestSplitF32F32(matrix, y, 0.2, true)
    let parameters = new ElasticNetParameters()
    parameters.withAlpha(0.5)
    parameters.withL1Ratio(0.5)
    let yHatEn = ElasticNetF32F32.fit(matrix, loadedDataset.target, parameters).predict(xTest)
    let meanSquareError = new MeanSquareErrorF32()
    let score = meanSquareError.getScore(yTest, yHatEn)
    assert(score)
  })
}
