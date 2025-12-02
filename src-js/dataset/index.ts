import { DenseMatrix, dataset, DatasetF64I32, DatasetF64F64, DatasetI32I32 } from '../core-bindings/index.js'
import type { YType } from '../index.js'

type DatasetRs = DatasetF64F64 | DatasetF64I32 | DatasetI32I32

class Dataset {
  inner: DatasetRs

  constructor(inner: DatasetRs) {
    this.inner = inner
  }
}

interface LoadParams {
  returnXY?: boolean
}

function prepResponse(data: DatasetRs, params?: LoadParams): Dataset | [DenseMatrix, YType] {
  if (params?.returnXY) {
    return [data.denseMatrixV2(), data.target]
  }

  return new Dataset(data)
}

function loadIris(params?: LoadParams): Dataset | [DenseMatrix, YType] {
  return prepResponse(dataset.iris().loadDataset(), params)
}

function loadBoston(params?: LoadParams): Dataset | [DenseMatrix, YType] {
  return prepResponse(dataset.boston().loadDataset(), params)
}

function loadBreastCancer(params?: LoadParams): Dataset | [DenseMatrix, YType] {
  return prepResponse(dataset.breastCancer().loadDataset(), params)
}

function loadDiabetes(params?: LoadParams): Dataset | [DenseMatrix, YType] {
  return prepResponse(dataset.diabetes().loadDataset(), params)
}

function loadDigits(params?: LoadParams): Dataset | [DenseMatrix, YType] {
  return prepResponse(dataset.digits().loadDataset(), params)
}

function loadDigitsI32(params?: LoadParams): Dataset | [DenseMatrix, YType] {
  return prepResponse(dataset.digits().loadDatasetI32(), params)
}

interface IMakeCircles extends LoadParams {
  numSamples: number
  factor: number
  noise: number
}

function makeCircles(params: IMakeCircles): Dataset | [DenseMatrix, YType] {
  return prepResponse(dataset.generator().makeCircles(params.numSamples, params.factor, params.noise), params)
}

interface IMakeBlobs extends LoadParams {
  numSamples: number
  numFeatures: number
  numCenters: number
}

function makeBlobs(params: IMakeBlobs): Dataset | [DenseMatrix, YType] {
  return prepResponse(dataset.generator().makeBlobs(params.numSamples, params.numFeatures, params.numCenters), params)
}

interface IMakeMoons extends LoadParams {
  numSamples: number
  noise: number
}

function makeMoons(params: IMakeMoons): Dataset | [DenseMatrix, YType] {
  return prepResponse(dataset.generator().makeMoons(params.numSamples, params.noise), params)
}

export {
  loadIris,
  loadBoston,
  loadBreastCancer,
  loadDiabetes,
  loadDigits,
  makeCircles,
  makeBlobs,
  makeMoons,
  loadDigitsI32,
}
