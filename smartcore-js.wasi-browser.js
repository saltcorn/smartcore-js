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
export const AUCF32 = __napiModule.exports.AUCF32
export const AUCf32 = __napiModule.exports.AUCf32
export const AUCF64 = __napiModule.exports.AUCF64
export const AUCf64 = __napiModule.exports.AUCf64
export const Boston = __napiModule.exports.Boston
export const BreastCancer = __napiModule.exports.BreastCancer
export const dataset = __napiModule.exports.dataset
export const Dataset = __napiModule.exports.Dataset
export const DatasetF32F32 = __napiModule.exports.DatasetF32F32
export const DatasetF32U32 = __napiModule.exports.DatasetF32U32
export const DenseMatrixF32 = __napiModule.exports.DenseMatrixF32
export const DenseMatrixF64 = __napiModule.exports.DenseMatrixF64
export const Diabetes = __napiModule.exports.Diabetes
export const Digits = __napiModule.exports.Digits
export const ElasticNetF32F32 = __napiModule.exports.ElasticNetF32F32
export const ElasticNetF32U32 = __napiModule.exports.ElasticNetF32U32
export const ElasticNetF64F64 = __napiModule.exports.ElasticNetF64F64
export const ElasticNetParameters = __napiModule.exports.ElasticNetParameters
export const Euclidianf32 = __napiModule.exports.Euclidianf32
export const EuclidianF32 = __napiModule.exports.EuclidianF32
export const Euclidianf64 = __napiModule.exports.Euclidianf64
export const EuclidianF64 = __napiModule.exports.EuclidianF64
export const Euclidiani32 = __napiModule.exports.Euclidiani32
export const EuclidianI32 = __napiModule.exports.EuclidianI32
export const Euclidiani64 = __napiModule.exports.Euclidiani64
export const EuclidianI64 = __napiModule.exports.EuclidianI64
export const Euclidianu32 = __napiModule.exports.Euclidianu32
export const EuclidianU32 = __napiModule.exports.EuclidianU32
export const Euclidianu64 = __napiModule.exports.Euclidianu64
export const EuclidianU64 = __napiModule.exports.EuclidianU64
export const F1F32 = __napiModule.exports.F1F32
export const F1f32 = __napiModule.exports.F1f32
export const F1F64 = __napiModule.exports.F1F64
export const F1f64 = __napiModule.exports.F1f64
export const GausianNBF32U32 = __napiModule.exports.GausianNBF32U32
export const GausianNBF64U64 = __napiModule.exports.GausianNBF64U64
export const GaussianNBParameters = __napiModule.exports.GaussianNBParameters
export const Generator = __napiModule.exports.Generator
export const HammingF32 = __napiModule.exports.HammingF32
export const HammingF64 = __napiModule.exports.HammingF64
export const HammingI32 = __napiModule.exports.HammingI32
export const HammingI64 = __napiModule.exports.HammingI64
export const HammingU32 = __napiModule.exports.HammingU32
export const HammingU64 = __napiModule.exports.HammingU64
export const HCVScoreU32 = __napiModule.exports.HCVScoreU32
export const HCVScoreu32 = __napiModule.exports.HCVScoreu32
export const HCVScoreU64 = __napiModule.exports.HCVScoreU64
export const HCVScoreu64 = __napiModule.exports.HCVScoreu64
export const Iris = __napiModule.exports.Iris
export const Kernels = __napiModule.exports.Kernels
export const KNNClassifierF32U32 = __napiModule.exports.KNNClassifierF32U32
export const KNNRegressorF32F32 = __napiModule.exports.KNNRegressorF32F32
export const KNNRegressorF32U32 = __napiModule.exports.KNNRegressorF32U32
export const KNNRegressorParametersF32EuclidianF32 = __napiModule.exports.KNNRegressorParametersF32EuclidianF32
export const EuclidianF32KNNRegressorParametersf32 = __napiModule.exports.EuclidianF32KNNRegressorParametersf32
export const KNNRegressorParametersF32HammingF32 = __napiModule.exports.KNNRegressorParametersF32HammingF32
export const HammingF32KNNRegressorParametersf32 = __napiModule.exports.HammingF32KNNRegressorParametersf32
export const LassoF32F32 = __napiModule.exports.LassoF32F32
export const LassoF32U32 = __napiModule.exports.LassoF32U32
export const LassoF64F64 = __napiModule.exports.LassoF64F64
export const LassoParameters = __napiModule.exports.LassoParameters
export const LinearRegressionF32F32 = __napiModule.exports.LinearRegressionF32F32
export const LinearRegressionF32U32 = __napiModule.exports.LinearRegressionF32U32
export const LinearRegressionF64F64 = __napiModule.exports.LinearRegressionF64F64
export const LinearRegressionParameters = __napiModule.exports.LinearRegressionParameters
export const LogisticRegressionF32U32 = __napiModule.exports.LogisticRegressionF32U32
export const LogisticRegressionF64U64 = __napiModule.exports.LogisticRegressionF64U64
export const LogisticRegressionParametersF32 = __napiModule.exports.LogisticRegressionParametersF32
export const LogisticRegressionParametersF64 = __napiModule.exports.LogisticRegressionParametersF64
export const MahalanobisF64 = __napiModule.exports.MahalanobisF64
export const ManhattanF32 = __napiModule.exports.ManhattanF32
export const ManhattanF64 = __napiModule.exports.ManhattanF64
export const ManhattanI32 = __napiModule.exports.ManhattanI32
export const ManhattanI64 = __napiModule.exports.ManhattanI64
export const ManhattanU32 = __napiModule.exports.ManhattanU32
export const ManhattanU64 = __napiModule.exports.ManhattanU64
export const MeanAbsoluteErrorF32 = __napiModule.exports.MeanAbsoluteErrorF32
export const MeanAbsoluteErrorf32 = __napiModule.exports.MeanAbsoluteErrorf32
export const MeanAbsoluteErrorF64 = __napiModule.exports.MeanAbsoluteErrorF64
export const MeanAbsoluteErrorf64 = __napiModule.exports.MeanAbsoluteErrorf64
export const MeanSquareErrorF32 = __napiModule.exports.MeanSquareErrorF32
export const MeanSquareErrorf32 = __napiModule.exports.MeanSquareErrorf32
export const MeanSquareErrorF64 = __napiModule.exports.MeanSquareErrorF64
export const MeanSquareErrorf64 = __napiModule.exports.MeanSquareErrorf64
export const MinkowskiF32 = __napiModule.exports.MinkowskiF32
export const MinkowskiF64 = __napiModule.exports.MinkowskiF64
export const MinkowskiI32 = __napiModule.exports.MinkowskiI32
export const MinkowskiI64 = __napiModule.exports.MinkowskiI64
export const MinkowskiU32 = __napiModule.exports.MinkowskiU32
export const MinkowskiU64 = __napiModule.exports.MinkowskiU64
export const PCAF32 = __napiModule.exports.PCAF32
export const PCAF64 = __napiModule.exports.PCAF64
export const PCAParameters = __napiModule.exports.PCAParameters
export const PrecisionF32 = __napiModule.exports.PrecisionF32
export const Precisionf32 = __napiModule.exports.Precisionf32
export const PrecisionF64 = __napiModule.exports.PrecisionF64
export const Precisionf64 = __napiModule.exports.Precisionf64
export const R2F32 = __napiModule.exports.R2F32
export const R2f32 = __napiModule.exports.R2f32
export const R2U32 = __napiModule.exports.R2U32
export const R2u32 = __napiModule.exports.R2u32
export const R2U64 = __napiModule.exports.R2U64
export const R2u64 = __napiModule.exports.R2u64
export const RecallF32 = __napiModule.exports.RecallF32
export const Recallf32 = __napiModule.exports.Recallf32
export const RecallF64 = __napiModule.exports.RecallF64
export const Recallf64 = __napiModule.exports.Recallf64
export const RidgeRegressionF32F32 = __napiModule.exports.RidgeRegressionF32F32
export const RidgeRegressionF32U32 = __napiModule.exports.RidgeRegressionF32U32
export const RidgeRegressionF64F64 = __napiModule.exports.RidgeRegressionF64F64
export const RidgeRegressionParametersF32 = __napiModule.exports.RidgeRegressionParametersF32
export const RidgeRegressionParametersF64 = __napiModule.exports.RidgeRegressionParametersF64
export const SVCF32U32 = __napiModule.exports.SVCF32U32
export const SVCF64U64 = __napiModule.exports.SVCF64U64
export const SVCParametersF32U32 = __napiModule.exports.SVCParametersF32U32
export const SVCParametersF64U64 = __napiModule.exports.SVCParametersF64U64
export const SVRF32 = __napiModule.exports.SVRF32
export const SVRF64 = __napiModule.exports.SVRF64
export const SVRParametersF32 = __napiModule.exports.SVRParametersF32
export const SVRParametersF64 = __napiModule.exports.SVRParametersF64
export const KNNAlgorithmName = __napiModule.exports.KNNAlgorithmName
export const KNNWeightFunction = __napiModule.exports.KNNWeightFunction
export const LinearRegressionSolverName = __napiModule.exports.LinearRegressionSolverName
export const LogisticRegressionSolverName = __napiModule.exports.LogisticRegressionSolverName
export const RidgeRegressionSolverName = __napiModule.exports.RidgeRegressionSolverName
export const trainTestSplitF32F32 = __napiModule.exports.trainTestSplitF32F32
export const trainTestSplitF32U32 = __napiModule.exports.trainTestSplitF32U32
export const trainTestSplitF64F64 = __napiModule.exports.trainTestSplitF64F64
