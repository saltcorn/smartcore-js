import { DataFrame } from '../data_frame.js'
import { DenseMatrix } from '../linalg/index.js'
import type { InputType } from '../pipeline/pipeline.js'
import { dataFrameToDenseMatrix } from './index.js'

function inputTypeToDenseMatrix(x: InputType): DenseMatrix {
  if (x instanceof DenseMatrix) return x
  if (x instanceof DataFrame) return dataFrameToDenseMatrix(x)
  if (Array.isArray(x)) return new DenseMatrix(x)
  else throw new Error(`Converting input of type ${typeof x} to DenseMatrix failed`)
}

export { inputTypeToDenseMatrix }
