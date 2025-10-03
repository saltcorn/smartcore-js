import { DenseMatrixF64, DenseMatrixI64, DenseMatrixU64 } from '../../../core-bindings/index.js'

type DenseMatrixRs = DenseMatrixF64 | DenseMatrixI64 | DenseMatrixU64

class DenseMatrix {
  private inner: DenseMatrixRs
  private _ncols: number
  private _nrows: number

  constructor(data: number[][] | DenseMatrixRs, columnMajor?: boolean | undefined) {
    if (data instanceof Array) {
      let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data)
      if (valuesFlat.every((val) => Number.isInteger(val))) {
        this.inner = new DenseMatrixI64(nrows, ncols, valuesFlat, columnMajor)
      } else {
        this.inner = new DenseMatrixF64(nrows, ncols, new Float64Array(valuesFlat), columnMajor)
      }
      this._ncols = ncols
      this._nrows = nrows
    } else {
      this.inner = data
      let [nrows, ncols] = this.inner.shape()
      this._ncols = ncols
      this._nrows = nrows
    }
  }

  get ncols(): number {
    return this._ncols
  }

  get nrows(): number {
    return this._nrows
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

  static u64(data: number[][], columnMajor?: boolean | undefined): DenseMatrix {
    let [nrows, ncols, valuesFlat] = DenseMatrix.prepData(data)
    let BigValuesFlat = valuesFlat.map((v) => BigInt(v))
    let matrix = new DenseMatrixU64(nrows, ncols, new BigUint64Array(BigValuesFlat), columnMajor)
    return new DenseMatrix(matrix, columnMajor)
  }

  asF64(): DenseMatrixF64 {
    if (!(this.inner instanceof DenseMatrixF64)) {
      throw new Error('Inner type not an f64 DenseMatrix.')
    }
    return this.inner
  }

  asU64(): DenseMatrixU64 {
    if (this.inner instanceof DenseMatrixU64) {
      return this.inner
    } else if (this.inner instanceof DenseMatrixI64) {
      // Convert inner into DenseMatrixU64 only if all values are positive
      if (this.inner.satisfies((x) => x > 0)) {
        const values = this.inner.values().map((v) => BigInt(v))
        return new DenseMatrixU64(this._nrows, this._ncols, new BigUint64Array(values))
      } else {
        throw new Error(`Conversion from ${typeof this.inner} to DenseMatrixU64 failed. Negative numbers found.`)
      }
    } else {
      throw new Error(`Conversion from ${typeof this.inner} to DenseMatrixU64 not supported.`)
    }
  }

  asI64(): DenseMatrixI64 {
    if (this.inner instanceof DenseMatrixI64) {
      return this.inner
    } else if (this.inner instanceof DenseMatrixU64) {
      if (
        this.inner.satisfies(
          (x: bigint) => x <= BigInt(Number.MAX_SAFE_INTEGER) && x >= BigInt(Number.MIN_SAFE_INTEGER),
        )
      ) {
        const bigintValues = this.inner.values()
        const values: number[] = [...bigintValues].map((v) => Number(v))
        return new DenseMatrixI64(this._nrows, this._ncols, values)
      } else {
        throw new Error(`Conversion from ${typeof this.inner} to DenseMatrixI64 failed. Maximum safe integer exceeded.`)
      }
    } else {
      throw new Error(`Conversion from ${typeof this.inner} to DenseMatrixI64 not supported.`)
    }
  }
}

export default DenseMatrix
