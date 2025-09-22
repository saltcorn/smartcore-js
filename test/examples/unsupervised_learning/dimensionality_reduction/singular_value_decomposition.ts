import assert from 'assert'
import { dataset, SVDParameters, SVDF32 } from '../../../../index'

export default () => {
  it('Singlular Value Decomposition  (SVD)', () => {
    let digitsData = dataset.digits().loadDataset()
    let x = digitsData.denseMatrix()
    let parameters = new SVDParameters()
    parameters.withNComponents(2)
    let svd = new SVDF32(x, parameters)
    let xTranformed = svd.transform(x)
    assert(xTranformed)
  })
}
