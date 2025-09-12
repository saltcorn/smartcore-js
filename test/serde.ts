import { dataset, DenseMatrixF32 } from '../index'
import assert from 'assert'

export default () => {
  it('Serialize/Deserialize - DenseMatrixF32', () => {
    let loadedDataset = dataset.boston().loadDataset()
    let matrix = loadedDataset.denseMatrix()
    let ser_matrix = matrix.serialize()
    let deser_matrix = DenseMatrixF32.deserialize(ser_matrix)
    assert(deser_matrix)
  })
}
