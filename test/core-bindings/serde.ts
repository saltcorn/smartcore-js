import { dataset, DenseMatrixF64 } from '../../src-js/core-bindings/index'
import assert from 'assert'

export default () => {
  it('Serialize/Deserialize - DenseMatrixF64', () => {
    let loadedDataset = dataset.breastCancer().loadDataset()
    let matrix = loadedDataset.denseMatrix()
    let ser_matrix = matrix.serialize()
    let deser_matrix = DenseMatrixF64.deserialize(ser_matrix)
    assert(deser_matrix)
  })
}
