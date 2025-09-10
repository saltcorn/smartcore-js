import { F32DenseMatrix } from '../index'

const jsm: Array<Array<number>> = [
  [1, 2, 3],
  [4, 5, 6],
]
const jsmFlat = new Float32Array(jsm.flat())
const m = new F32DenseMatrix(2, 3, jsmFlat)
