import { trainTestSplitF64F64, trainTestSplitF64I64 } from '../../core-bindings/index.js'
import { DenseMatrix } from '../linalg/index.js'

interface TrainTestSplitParams {
  testSize: number
  shuffle?: boolean
  seed?: bigint
}

function trainTestSplit(
  x: DenseMatrix | number[][],
  y: number[] | BigInt64Array,
  params: TrainTestSplitParams,
): [DenseMatrix, DenseMatrix, BigInt64Array | Float64Array, BigInt64Array | Float64Array] {
  x = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)
  let shuffle = params?.shuffle === undefined ? true : params?.shuffle
  if (y instanceof BigInt64Array) {
    let [xTrain, xTest, yTrain, yTest] = trainTestSplitF64I64(x.asF64(), y, params.testSize, shuffle, params.seed)
    return [new DenseMatrix(xTrain), new DenseMatrix(xTest), yTrain, yTest]
  }
  if (!y.every((val) => Number.isInteger(val))) {
    let ys = new Float64Array(y)
    let [xTrain, xTest, yTrain, yTest] = trainTestSplitF64F64(x.asF64(), ys, params.testSize, shuffle, params.seed)
    return [new DenseMatrix(xTrain), new DenseMatrix(xTest), yTrain, yTest]
  }
  let ys = new BigInt64Array(
    y.map((n) => {
      return BigInt(n)
    }),
  )
  let [xTrain, xTest, yTrain, yTest] = trainTestSplitF64I64(x.asF64(), ys, params?.testSize, shuffle, params?.seed)
  return [new DenseMatrix(xTrain), new DenseMatrix(xTest), yTrain, yTest]
}

export { trainTestSplit }
