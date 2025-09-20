import assert from 'assert'
import { dataset, PCAParameters, PCAF64 } from '../../../../index.js'

export default () => {
  it('Principal Component Analysis (PCA)', () => {
    let loadedDataset = dataset.digits().loadDataset()
    let x = loadedDataset.denseMatrix()
    let parameters = new PCAParameters()
    parameters.withNComponents(2)
    let pca = new PCAF64(x, parameters)
    let xTranformed = pca.transform(x)
    assert(xTranformed)
  })
}
