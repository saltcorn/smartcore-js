import { DataFrame } from '../data_frame.js'
import { dataFrameToDenseMatrix } from './index.js'
import { DenseMatrix, type DenseMatrixType } from '../core-bindings/index.js'
import { utilities, type InputType } from '../index.js'

interface InputTypeToDenseMatrixParameters {
  columns?: string[]
  numberType?: DenseMatrixType
}

function inputTypeToDenseMatrix(x: InputType, params?: InputTypeToDenseMatrixParameters): DenseMatrix {
  if (x instanceof DenseMatrix) return x
  if (x instanceof DataFrame) return dataFrameToDenseMatrix(x, params)
  if (Array.isArray(x)) return utilities.arrayToDenseMatrix(x, { numberType: params?.numberType })
  else throw new Error(`Converting input of type ${typeof x} to DenseMatrix failed`)
}

export { inputTypeToDenseMatrix }
