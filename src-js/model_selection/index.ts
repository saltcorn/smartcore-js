import {
  trainTestSplitF64F64,
  trainTestSplitF64I64,
  trainTestSplitF64BigI64,
  trainTestSplitF64BigU64,
} from '../../core-bindings/index.js'
import type { XType, YType } from '../index.js'
import { DenseMatrix } from '../linalg/index.js'

interface TrainTestSplitParams {
  testSize: number
  shuffle?: boolean
  seed?: bigint
}

function trainTestSplit(x: XType, y: YType, params: TrainTestSplitParams): [XType, XType, YType, YType] {
  x = x instanceof DenseMatrix ? x : DenseMatrix.f64(x)
  let shuffle = params?.shuffle === undefined ? true : params?.shuffle
  if (y instanceof BigInt64Array) {
    let [xTrain, xTest, yTrain, yTest] = trainTestSplitF64BigI64(x.asF64(), y, params.testSize, shuffle, params.seed)
    return [new DenseMatrix(xTrain), new DenseMatrix(xTest), yTrain, yTest]
  } else if (y instanceof BigUint64Array) {
    let [xTrain, xTest, yTrain, yTest] = trainTestSplitF64BigU64(x.asF64(), y, params.testSize, shuffle, params.seed)
    return [new DenseMatrix(xTrain), new DenseMatrix(xTest), yTrain, yTest]
  } else if (y instanceof Float64Array || !y.every((val) => Number.isInteger(val))) {
    let ys = new Float64Array(y)
    let [xTrain, xTest, yTrain, yTest] = trainTestSplitF64F64(x.asF64(), ys, params.testSize, shuffle, params.seed)
    return [new DenseMatrix(xTrain), new DenseMatrix(xTest), yTrain, yTest]
  }
  let [xTrain, xTest, yTrain, yTest] = trainTestSplitF64I64(x.asF64(), y, params?.testSize, shuffle, params?.seed)
  return [new DenseMatrix(xTrain), new DenseMatrix(xTest), yTrain, yTest]
}

export { trainTestSplit }
