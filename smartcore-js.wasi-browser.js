import {
  createOnMessage as __wasmCreateOnMessageForFsProxy,
  getDefaultContext as __emnapiGetDefaultContext,
  instantiateNapiModuleSync as __emnapiInstantiateNapiModuleSync,
  WASI as __WASI,
} from '@napi-rs/wasm-runtime'



const __wasi = new __WASI({
  version: 'preview1',
})

const __wasmUrl = new URL('./smartcore-js.wasm32-wasi.wasm', import.meta.url).href
const __emnapiContext = __emnapiGetDefaultContext()


const __sharedMemory = new WebAssembly.Memory({
  initial: 4000,
  maximum: 65536,
  shared: true,
})

const __wasmFile = await fetch(__wasmUrl).then((res) => res.arrayBuffer())

const {
  instance: __napiInstance,
  module: __wasiModule,
  napiModule: __napiModule,
} = __emnapiInstantiateNapiModuleSync(__wasmFile, {
  context: __emnapiContext,
  asyncWorkPoolSize: 4,
  wasi: __wasi,
  onCreateWorker() {
    const worker = new Worker(new URL('./wasi-worker-browser.mjs', import.meta.url), {
      type: 'module',
    })

    return worker
  },
  overwriteImports(importObject) {
    importObject.env = {
      ...importObject.env,
      ...importObject.napi,
      ...importObject.emnapi,
      memory: __sharedMemory,
    }
    return importObject
  },
  beforeInit({ instance }) {
    for (const name of Object.keys(instance.exports)) {
      if (name.startsWith('__napi_register__')) {
        instance.exports[name]()
      }
    }
  },
})
export default __napiModule.exports
export const AccuracyF32 = __napiModule.exports.AccuracyF32
export const Accuracyf32 = __napiModule.exports.Accuracyf32
export const AccuracyF64 = __napiModule.exports.AccuracyF64
export const Accuracyf64 = __napiModule.exports.Accuracyf64
export const AccuracyU32 = __napiModule.exports.AccuracyU32
export const Accuracyu32 = __napiModule.exports.Accuracyu32
export const Aucf32 = __napiModule.exports.Aucf32
export const AUCF32 = __napiModule.exports.AUCF32
export const Boston = __napiModule.exports.Boston
export const BreastCancer = __napiModule.exports.BreastCancer
export const dataset = __napiModule.exports.dataset
export const Dataset = __napiModule.exports.Dataset
export const Datasetf32F32 = __napiModule.exports.Datasetf32F32
export const Datasetf32f32 = __napiModule.exports.Datasetf32f32
export const Datasetf32U32 = __napiModule.exports.Datasetf32U32
export const Datasetf32u32 = __napiModule.exports.Datasetf32u32
export const DenseMatrixf32 = __napiModule.exports.DenseMatrixf32
export const DenseMatrixf64 = __napiModule.exports.DenseMatrixf64
export const Diabetes = __napiModule.exports.Diabetes
export const Digits = __napiModule.exports.Digits
export const Euclidianf32 = __napiModule.exports.Euclidianf32
export const Euclidianf64 = __napiModule.exports.Euclidianf64
export const Euclidiani32 = __napiModule.exports.Euclidiani32
export const Euclidiani64 = __napiModule.exports.Euclidiani64
export const Euclidianu32 = __napiModule.exports.Euclidianu32
export const Euclidianu64 = __napiModule.exports.Euclidianu64
export const F1F32 = __napiModule.exports.F1F32
export const Generator = __napiModule.exports.Generator
export const Hammingf32 = __napiModule.exports.Hammingf32
export const Hammingf64 = __napiModule.exports.Hammingf64
export const Hammingi32 = __napiModule.exports.Hammingi32
export const Hammingi64 = __napiModule.exports.Hammingi64
export const Hammingu32 = __napiModule.exports.Hammingu32
export const Hammingu64 = __napiModule.exports.Hammingu64
export const HcvScoreU32 = __napiModule.exports.HcvScoreU32
export const HCVScoreU32 = __napiModule.exports.HCVScoreU32
export const Iris = __napiModule.exports.Iris
export const KNNClassifierF32U32 = __napiModule.exports.KNNClassifierF32U32
export const KNNClassifierf32u32 = __napiModule.exports.KNNClassifierf32u32
export const Mahalanobisf64 = __napiModule.exports.Mahalanobisf64
export const Manhattanf32 = __napiModule.exports.Manhattanf32
export const Manhattanf64 = __napiModule.exports.Manhattanf64
export const Manhattani32 = __napiModule.exports.Manhattani32
export const Manhattani64 = __napiModule.exports.Manhattani64
export const Manhattanu32 = __napiModule.exports.Manhattanu32
export const Manhattanu64 = __napiModule.exports.Manhattanu64
export const MeanAbsoluteErrorF32 = __napiModule.exports.MeanAbsoluteErrorF32
export const MeanSquareErrorF32 = __napiModule.exports.MeanSquareErrorF32
export const Minkowskif32 = __napiModule.exports.Minkowskif32
export const Minkowskif64 = __napiModule.exports.Minkowskif64
export const Minkowskii32 = __napiModule.exports.Minkowskii32
export const Minkowskii64 = __napiModule.exports.Minkowskii64
export const Minkowskiu32 = __napiModule.exports.Minkowskiu32
export const Minkowskiu64 = __napiModule.exports.Minkowskiu64
export const PCAF32 = __napiModule.exports.PCAF32
export const PCAf32 = __napiModule.exports.PCAf32
export const PCAF64 = __napiModule.exports.PCAF64
export const PCAf64 = __napiModule.exports.PCAf64
export const PCAParameters = __napiModule.exports.PCAParameters
export const PrecisionF32 = __napiModule.exports.PrecisionF32
export const R2U32 = __napiModule.exports.R2U32
export const RecallF32 = __napiModule.exports.RecallF32
export const RidgeRegressionF32F32 = __napiModule.exports.RidgeRegressionF32F32
export const RidgeRegressionf32f32 = __napiModule.exports.RidgeRegressionf32f32
export const RidgeRegressionF64F64 = __napiModule.exports.RidgeRegressionF64F64
export const RidgeRegressionf64f64 = __napiModule.exports.RidgeRegressionf64f64
export const RidgeRegressionParametersF32 = __napiModule.exports.RidgeRegressionParametersF32
export const RidgeRegressionParametersf32 = __napiModule.exports.RidgeRegressionParametersf32
export const RidgeRegressionParametersF64 = __napiModule.exports.RidgeRegressionParametersF64
export const RidgeRegressionParametersf64 = __napiModule.exports.RidgeRegressionParametersf64
export const RidgeRegressionSolverName = __napiModule.exports.RidgeRegressionSolverName
export const trainTestSplitF32F32 = __napiModule.exports.trainTestSplitF32F32
export const trainTestSplitF64F64 = __napiModule.exports.trainTestSplitF64F64
