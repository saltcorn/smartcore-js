import { dataset, trainTestSplitF32F32, MeanSquareErrorF32, ElasticNetF32F32, ElasticNetParameters } from '../../index'
import assert from 'assert'

export default () => {
  it('Elastic Net', () => {
    let loadedDataset = dataset.boston().loadDataset()
    let matrix = loadedDataset.denseMatrix()
    let y = loadedDataset.target
    let [, x_test, , y_test] = trainTestSplitF32F32(matrix, y, 0.2, true)
    let parameters = new ElasticNetParameters()
    parameters.withAlpha(0.5)
    parameters.withL1Ratio(0.5)
    let y_hat_en = ElasticNetF32F32.fit(matrix, loadedDataset.target, parameters).predict(x_test)
    let mean_square_error = new MeanSquareErrorF32()
    let score = mean_square_error.getScore(y_test, y_hat_en)
    assert(score)
  })
}
