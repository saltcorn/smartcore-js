import { DenseMatrixF64, trainTestSplitF64F64 } from '../../index.js'

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
    const jsmFlat = new Float64Array(arrays.flat())
    const x = new DenseMatrixF64(arrays.length, arrays[0].length, jsmFlat)
    const y = new Float64Array([7, 8, 9, 7, 8, 9, 7, 8, 9])
    let [, , ,] = trainTestSplitF64F64(x, y, 0.2, true)
  })
})
