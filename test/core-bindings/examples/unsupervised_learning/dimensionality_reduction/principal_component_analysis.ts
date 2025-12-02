import assert from 'assert'
import { dataset, PCABuilder, PCA } from '../../../../../src-js/core-bindings/index.js'

export default () => {
  it('Principal Component Analysis (PCA)', () => {
    let loadedDataset = dataset.digits().loadDataset()
    let x = loadedDataset.denseMatrixV2()
    let builder = new PCABuilder(x)
    builder.withNComponents(2n)
    let pca = builder.build()
    let xTranformed = pca.transform(x)
    assert(xTranformed)
  })
}
