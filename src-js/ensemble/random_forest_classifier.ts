import { RandomForestClassifierF64I64, RandomForestClassifierParameters } from '../../core-bindings/index.js'
import { DenseMatrix } from '../linalg/index.js'

class RandomForestClassifier {
  inner: RandomForestClassifierF64I64

  constructor(inner: RandomForestClassifierF64I64) {
    this.inner = inner
  }

  static fit(
    x: DenseMatrix | number[][],
    y: number[],
    parameters: RandomForestClassifierParameters | null,
  ): RandomForestClassifier {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)

    if (!y || y.length === 0) {
      throw new Error('Input arrays cannot be empty.')
    }

    if (y.every((val) => Number.isInteger(val))) {
      parameters = parameters ? parameters : new RandomForestClassifierParameters()
      return new RandomForestClassifier(RandomForestClassifierF64I64.fit(matrix.asF64(), y, parameters))
    } else {
      throw new Error('Unsupported data type for input arrays.')
    }
  }

  predict(x: DenseMatrix | number[][]): number[] {
    let matrix = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)
    return this.inner.predict(matrix.asF64())
  }

  serialize() {
    return this.inner?.serialize()
  }

  static deserialize(data: Buffer): RandomForestClassifier {
    try {
      let inner = RandomForestClassifierF64I64.deserialize(data)
      return new RandomForestClassifier(inner)
    } catch (e) {
      try {
        let inner = RandomForestClassifierF64I64.deserialize(data)
        return new RandomForestClassifier(inner)
      } catch (e) {
        throw e
      }
    }
  }
}

export { RandomForestClassifier, RandomForestClassifierParameters }
