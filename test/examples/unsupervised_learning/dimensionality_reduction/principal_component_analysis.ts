import assert from 'assert'
import { dataset, PCAParameters, PCAF32 } from '../../../../index'

export default () => {
  it('Principal Component Analysis (PCA)', () => {
    let loadedDataset = dataset.digits().loadDataset()
    let x = loadedDataset.denseMatrix()
    let parameters = new PCAParameters()
    parameters.withNComponents(2)
    let pca = new PCAF32(x, parameters)
    let xTranformed = pca.transform(x)
    assert(xTranformed)
  })
}
