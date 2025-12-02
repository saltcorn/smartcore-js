import assert from 'assert'
import { dataset, SVDBuilder, SVD } from '../../../../../src-js/core-bindings/index.js'

export default () => {
  it('Singlular Value Decomposition  (SVD)', () => {
    let digitsData = dataset.digits().loadDataset()
    let x = digitsData.denseMatrixV2()
    let builder = new SVDBuilder(x)
    builder.withNComponents(2n)
    let svd = builder.build()
    let xTranformed = svd.transform(x)
    assert(xTranformed)
  })
}
