import assert from 'assert'
import { dataset, PcaParameters, PcAf32 } from '../../index'

export default () => {
  it('Principal Component Analysis (PCA)', () => {
    let loadedDataset = dataset.digits().loadDataset()
    let matrix = loadedDataset.denseMatrix()
    let pca_params = new PcaParameters()
    pca_params.withNComponents(2)
    let pca = new PcAf32(matrix, pca_params)
    let matrix_tranformed = pca.transform(matrix)
    assert(matrix_tranformed)
  })
}
