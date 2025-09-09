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
export const Aucf32 = __napiModule.exports.Aucf32
export const AUCF32 = __napiModule.exports.AUCF32
export const boston = __napiModule.exports.boston
export const Boston = __napiModule.exports.Boston
export const BreastCancer = __napiModule.exports.BreastCancer
export const dataset = __napiModule.exports.dataset
export const Dataset = __napiModule.exports.Dataset
export const DatasetF32F32 = __napiModule.exports.DatasetF32F32
export const DatasetF32U32 = __napiModule.exports.DatasetF32U32
export const Diabetes = __napiModule.exports.Diabetes
export const Digits = __napiModule.exports.Digits
export const F1F32 = __napiModule.exports.F1F32
export const F32DenseMatrix = __napiModule.exports.F32DenseMatrix
export const F32Pca = __napiModule.exports.F32Pca
export const F32PCA = __napiModule.exports.F32PCA
export const Generator = __napiModule.exports.Generator
export const HcvScoreU32 = __napiModule.exports.HcvScoreU32
export const HCVScoreU32 = __napiModule.exports.HCVScoreU32
export const Iris = __napiModule.exports.Iris
export const MeanAbsoluteErrorF32 = __napiModule.exports.MeanAbsoluteErrorF32
export const MeanSquareErrorF32 = __napiModule.exports.MeanSquareErrorF32
export const PcaParameters = __napiModule.exports.PcaParameters
export const PCAParameters = __napiModule.exports.PCAParameters
export const PrecisionF32 = __napiModule.exports.PrecisionF32
export const R2U32 = __napiModule.exports.R2U32
export const RecallF32 = __napiModule.exports.RecallF32
export const RidgeRegressionF32 = __napiModule.exports.RidgeRegressionF32
export const RidgeRegressionParameters = __napiModule.exports.RidgeRegressionParameters
export const RidgeRegressionSolverName = __napiModule.exports.RidgeRegressionSolverName
export const trainTestSplitF32F32 = __napiModule.exports.trainTestSplitF32F32
