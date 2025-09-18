import { DenseMatrixF32, trainTestSplitF32F32 } from '../../index'

describe('Custom', () => {
  it('Simple Array', () => {
    const arrays = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]
    const jsmFlat = new Float32Array(arrays.flat())
    const x = new DenseMatrixF32(arrays.length, arrays[0].length, jsmFlat)
    const y = new Float32Array([7, 8, 9, 7, 8, 9, 7, 8, 9])
    let [x_train, x_test, y_train, y_test] = trainTestSplitF32F32(x, y, 0.2, true)
  })
})
