import assert from 'assert'
import { dataset, SVDParameters, SVDF64 } from '../../../../../src-js/core-bindings/index.js'

export default () => {
  it('Singlular Value Decomposition  (SVD)', () => {
    let digitsData = dataset.digits().loadDataset()
    let x = digitsData.denseMatrix()
    let parameters = new SVDParameters()
    parameters.withNComponents(2)
    let svd = SVDF64.fit(x, parameters)
    let xTranformed = svd.transform(x)
    assert(xTranformed)
  })
}
