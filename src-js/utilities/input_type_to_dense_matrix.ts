import { DataFrame } from '../data_frame.js'
// import { dataFrameToDenseMatrix } from './index.js'
import { DenseMatrix } from '../core-bindings/index.js'
import { utilities, type InputType } from '../index.js'

function inputTypeToDenseMatrix(x: InputType): DenseMatrix {
  if (x instanceof DenseMatrix) return x
  if (x instanceof DataFrame)
    // return dataFrameToDenseMatrix(x)
    throw new Error('Unimplemented!')
  if (Array.isArray(x)) return utilities.arrayToDenseMatrix(x)
  else throw new Error(`Converting input of type ${typeof x} to DenseMatrix failed`)
}

export { inputTypeToDenseMatrix }
