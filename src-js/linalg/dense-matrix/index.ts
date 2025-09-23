import { DenseMatrixF64, DenseMatrixI64, DenseMatrixU64 } from '../../../core-bindings/index.js'

type DenseMatrixRs = DenseMatrixF64 | DenseMatrixI64 | DenseMatrixU64

class DenseMatrix {
  private inner: DenseMatrixRs

  constructor(data: number[][] | DenseMatrixRs, columnMajor?: boolean | undefined) {
    if (data instanceof Array) {
      let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data)
      if (valuesFlat.every((val) => Number.isInteger(val))) {
        this.inner = new DenseMatrixI64(nrows, ncols, valuesFlat, columnMajor)
      } else {
        this.inner = new DenseMatrixF64(nrows, ncols, new Float64Array(valuesFlat), columnMajor)
      }
    } else {
      this.inner = data
    }
  }

  private static prepData(data: number[][]): [number, number, number[]] {
    if (!(data instanceof Array)) {
      throw new Error('Expected data to be an array.')
    }
    let nrows = data.length
    let ncols = data[0] instanceof Array ? data[0].length : 0
    let valuesFlat = data.flat()
    return [nrows, ncols, valuesFlat]
  }

  get matrix(): DenseMatrixRs {
    return this.inner
  }

  static f64(data: number[][], columnMajor?: boolean | undefined): DenseMatrix {
    let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data)
    let matrix = new DenseMatrixF64(nrows, ncols, new Float64Array(valuesFlat), columnMajor)
    return new DenseMatrix(matrix, columnMajor)
  }

  asF64(): DenseMatrixF64 {
    if (!(this.inner instanceof DenseMatrixF64)) {
      throw new Error('Inner type not an f64 DenseMatrix')
    }
    return this.inner
  }
}

export default DenseMatrix
