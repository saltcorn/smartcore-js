import { dataset, DatasetF64I64, type DatasetF64F64 } from '../../core-bindings/index.js'
import { DenseMatrix } from '../linalg/index.js'

type DatasetRs = DatasetF64F64 | DatasetF64I64

class Dataset {
  inner: DatasetRs

  constructor(inner: DatasetRs) {
    this.inner = inner
  }
}

interface LoadIrisParams {
  returnXY?: boolean
}

function loadIris(params?: LoadIrisParams): Dataset | [DenseMatrix, number[] | BigInt64Array] {
  let irisData = dataset.iris().loadDataset()
  if (params?.returnXY) {
    return [new DenseMatrix(irisData.denseMatrix()), irisData.target]
  }

  return new Dataset(irisData)
}

export { loadIris }
