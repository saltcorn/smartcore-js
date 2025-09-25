import { dataset, DatasetF64I64, type DatasetF64F64 } from '../../core-bindings/index.js'
import type { YType } from '../index.js'
import { DenseMatrix } from '../linalg/index.js'

type DatasetRs = DatasetF64F64 | DatasetF64I64

class Dataset {
  inner: DatasetRs

  constructor(inner: DatasetRs) {
    this.inner = inner
  }
}

interface LoadParams {
  returnXY?: boolean
}

function loadIris(params?: LoadParams): Dataset | [DenseMatrix, YType] {
  let irisData = dataset.iris().loadDataset()
  if (params?.returnXY) {
    return [new DenseMatrix(irisData.denseMatrix()), irisData.target]
  }

  return new Dataset(irisData)
}

function loadBoston(params?: LoadParams): Dataset | [DenseMatrix, YType] {
  let bostonData = dataset.boston().loadDataset()
  if (params?.returnXY) {
    return [new DenseMatrix(bostonData.denseMatrix()), bostonData.target]
  }

  return new Dataset(bostonData)
}

function loadBreastCancer(params?: LoadParams): Dataset | [DenseMatrix, YType] {
  let breastCancerData = dataset.breastCancer().loadDataset()
  if (params?.returnXY) {
    return [new DenseMatrix(breastCancerData.denseMatrix()), breastCancerData.target]
  }

  return new Dataset(breastCancerData)
}

function loadDiabetes(params?: LoadParams): Dataset | [DenseMatrix, YType] {
  let diabetesData = dataset.diabetes().loadDataset()
  if (params?.returnXY) {
    return [new DenseMatrix(diabetesData.denseMatrix()), diabetesData.target]
  }

  return new Dataset(diabetesData)
}

function loadDigits(params?: LoadParams): Dataset | [DenseMatrix, YType] {
  let digitsData = dataset.diabetes().loadDataset()
  if (params?.returnXY) {
    return [new DenseMatrix(digitsData.denseMatrix()), digitsData.target]
  }

  return new Dataset(digitsData)
}

export { loadIris, loadBoston, loadBreastCancer, loadDiabetes, loadDigits }
