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
export const AccuracyF64 = __napiModule.exports.AccuracyF64
export const Accuracyf64 = __napiModule.exports.Accuracyf64
export const AccuracyI32 = __napiModule.exports.AccuracyI32
export const Accuracyi32 = __napiModule.exports.Accuracyi32
export const AccuracyI64 = __napiModule.exports.AccuracyI64
export const Accuracyi64 = __napiModule.exports.Accuracyi64
export const AccuracyU64 = __napiModule.exports.AccuracyU64
export const Accuracyu64 = __napiModule.exports.Accuracyu64
export const AUCF64 = __napiModule.exports.AUCF64
export const AUCf64 = __napiModule.exports.AUCf64
export const BernoulliNBF64BigU64 = __napiModule.exports.BernoulliNBF64BigU64
export const BernoulliNBF64Parameters = __napiModule.exports.BernoulliNBF64Parameters
export const Boston = __napiModule.exports.Boston
export const BreastCancer = __napiModule.exports.BreastCancer
export const CategoricalNBBigU64 = __napiModule.exports.CategoricalNBBigU64
export const CategoricalNBParameters = __napiModule.exports.CategoricalNBParameters
export const CrossValidationResult = __napiModule.exports.CrossValidationResult
export const dataset = __napiModule.exports.dataset
export const Dataset = __napiModule.exports.Dataset
export const DatasetF64F64 = __napiModule.exports.DatasetF64F64
export const DatasetF64F64JsVecRef = __napiModule.exports.DatasetF64F64JsVecRef
export const DatasetF64I32 = __napiModule.exports.DatasetF64I32
export const DatasetF64I32JsVecRef = __napiModule.exports.DatasetF64I32JsVecRef
export const DBSCANF32EuclidianF32Parameters = __napiModule.exports.DBSCANF32EuclidianF32Parameters
export const DBSCANF32I32EuclidianF32 = __napiModule.exports.DBSCANF32I32EuclidianF32
export const DBSCANF32I32MahalanobisF32 = __napiModule.exports.DBSCANF32I32MahalanobisF32
export const DBSCANF32I32ManhattanF32 = __napiModule.exports.DBSCANF32I32ManhattanF32
export const DBSCANF32I32MinkowskiF32 = __napiModule.exports.DBSCANF32I32MinkowskiF32
export const DBSCANF32MahalanobisF32Parameters = __napiModule.exports.DBSCANF32MahalanobisF32Parameters
export const DBSCANF32ManhattanF32Parameters = __napiModule.exports.DBSCANF32ManhattanF32Parameters
export const DBSCANF32MinkowskiF32Parameters = __napiModule.exports.DBSCANF32MinkowskiF32Parameters
export const DBSCANF64EuclidianF64Parameters = __napiModule.exports.DBSCANF64EuclidianF64Parameters
export const DBSCANF64I32EuclidianF64 = __napiModule.exports.DBSCANF64I32EuclidianF64
export const DBSCANF64I32MahalanobisF64 = __napiModule.exports.DBSCANF64I32MahalanobisF64
export const DBSCANF64I32ManhattanF64 = __napiModule.exports.DBSCANF64I32ManhattanF64
export const DBSCANF64I32MinkowskiF64 = __napiModule.exports.DBSCANF64I32MinkowskiF64
export const DBSCANF64MahalanobisF64Parameters = __napiModule.exports.DBSCANF64MahalanobisF64Parameters
export const DBSCANF64ManhattanF64Parameters = __napiModule.exports.DBSCANF64ManhattanF64Parameters
export const DBSCANF64MinkowskiF64Parameters = __napiModule.exports.DBSCANF64MinkowskiF64Parameters
export const DBSCANI32EuclidianI32Parameters = __napiModule.exports.DBSCANI32EuclidianI32Parameters
export const DBSCANI32HammingI32Parameters = __napiModule.exports.DBSCANI32HammingI32Parameters
export const DBSCANI32I32EuclidianI32 = __napiModule.exports.DBSCANI32I32EuclidianI32
export const DBSCANI32I32HammingI32 = __napiModule.exports.DBSCANI32I32HammingI32
export const DBSCANI32I32ManhattanI32 = __napiModule.exports.DBSCANI32I32ManhattanI32
export const DBSCANI32I32MinkowskiI32 = __napiModule.exports.DBSCANI32I32MinkowskiI32
export const DBSCANI32ManhattanI32Parameters = __napiModule.exports.DBSCANI32ManhattanI32Parameters
export const DBSCANI32MinkowskiI32Parameters = __napiModule.exports.DBSCANI32MinkowskiI32Parameters
export const DBSCANI64EuclidianI64Parameters = __napiModule.exports.DBSCANI64EuclidianI64Parameters
export const DBSCANI64I32EuclidianI64 = __napiModule.exports.DBSCANI64I32EuclidianI64
export const DBSCANI64I32ManhattanI64 = __napiModule.exports.DBSCANI64I32ManhattanI64
export const DBSCANI64I32MinkowskiI64 = __napiModule.exports.DBSCANI64I32MinkowskiI64
export const DBSCANI64ManhattanI64Parameters = __napiModule.exports.DBSCANI64ManhattanI64Parameters
export const DBSCANI64MinkowskiI64Parameters = __napiModule.exports.DBSCANI64MinkowskiI64Parameters
export const DBSCANU16EuclidianU16Parameters = __napiModule.exports.DBSCANU16EuclidianU16Parameters
export const DBSCANU16HammingU16Parameters = __napiModule.exports.DBSCANU16HammingU16Parameters
export const DBSCANU16I32EuclidianU16 = __napiModule.exports.DBSCANU16I32EuclidianU16
export const DBSCANU16I32HammingU16 = __napiModule.exports.DBSCANU16I32HammingU16
export const DBSCANU32EuclidianU32Parameters = __napiModule.exports.DBSCANU32EuclidianU32Parameters
export const DBSCANU32I32EuclidianU32 = __napiModule.exports.DBSCANU32I32EuclidianU32
export const DBSCANU32I32ManhattanU32 = __napiModule.exports.DBSCANU32I32ManhattanU32
export const DBSCANU32ManhattanU32Parameters = __napiModule.exports.DBSCANU32ManhattanU32Parameters
export const DBSCANU64EuclidianU64Parameters = __napiModule.exports.DBSCANU64EuclidianU64Parameters
export const DBSCANU64I32EuclidianU64 = __napiModule.exports.DBSCANU64I32EuclidianU64
export const DBSCANU64I32ManhattanU64 = __napiModule.exports.DBSCANU64I32ManhattanU64
export const DBSCANU64ManhattanU64Parameters = __napiModule.exports.DBSCANU64ManhattanU64Parameters
export const DBSCANU8EuclidianU8Parameters = __napiModule.exports.DBSCANU8EuclidianU8Parameters
export const DBSCANU8HammingU8Parameters = __napiModule.exports.DBSCANU8HammingU8Parameters
export const DBSCANU8I32EuclidianU8 = __napiModule.exports.DBSCANU8I32EuclidianU8
export const DBSCANU8I32HammingU8 = __napiModule.exports.DBSCANU8I32HammingU8
export const DecisionTreeClassifierI64I64 = __napiModule.exports.DecisionTreeClassifierI64I64
export const DecisionTreeClassifierParameters = __napiModule.exports.DecisionTreeClassifierParameters
export const DecisionTreeRegressorI64I64 = __napiModule.exports.DecisionTreeRegressorI64I64
export const DecisionTreeRegressorParameters = __napiModule.exports.DecisionTreeRegressorParameters
export const DenseMatrixF32 = __napiModule.exports.DenseMatrixF32
export const DenseMatrixF64 = __napiModule.exports.DenseMatrixF64
export const DenseMatrixI32 = __napiModule.exports.DenseMatrixI32
export const DenseMatrixI64 = __napiModule.exports.DenseMatrixI64
export const DenseMatrixU16 = __napiModule.exports.DenseMatrixU16
export const DenseMatrixU32 = __napiModule.exports.DenseMatrixU32
export const DenseMatrixU64 = __napiModule.exports.DenseMatrixU64
export const DenseMatrixU8 = __napiModule.exports.DenseMatrixU8
export const Diabetes = __napiModule.exports.Diabetes
export const Digits = __napiModule.exports.Digits
export const ElasticNetF64BigI64 = __napiModule.exports.ElasticNetF64BigI64
export const ElasticNetF64BigU64 = __napiModule.exports.ElasticNetF64BigU64
export const ElasticNetF64F64 = __napiModule.exports.ElasticNetF64F64
export const ElasticNetF64I64 = __napiModule.exports.ElasticNetF64I64
export const ElasticNetParameters = __napiModule.exports.ElasticNetParameters
export const EuclidianF32 = __napiModule.exports.EuclidianF32
export const EuclidianF64 = __napiModule.exports.EuclidianF64
export const EuclidianI32 = __napiModule.exports.EuclidianI32
export const EuclidianI64 = __napiModule.exports.EuclidianI64
export const EuclidianU16 = __napiModule.exports.EuclidianU16
export const EuclidianU32 = __napiModule.exports.EuclidianU32
export const EuclidianU64 = __napiModule.exports.EuclidianU64
export const EuclidianU8 = __napiModule.exports.EuclidianU8
export const ExtraTreesRegressorF32F32 = __napiModule.exports.ExtraTreesRegressorF32F32
export const ExtraTreesRegressorF32F64 = __napiModule.exports.ExtraTreesRegressorF32F64
export const ExtraTreesRegressorF32I32 = __napiModule.exports.ExtraTreesRegressorF32I32
export const ExtraTreesRegressorF32I64 = __napiModule.exports.ExtraTreesRegressorF32I64
export const ExtraTreesRegressorF32U64 = __napiModule.exports.ExtraTreesRegressorF32U64
export const ExtraTreesRegressorF64F32 = __napiModule.exports.ExtraTreesRegressorF64F32
export const ExtraTreesRegressorF64F64 = __napiModule.exports.ExtraTreesRegressorF64F64
export const ExtraTreesRegressorF64I32 = __napiModule.exports.ExtraTreesRegressorF64I32
export const ExtraTreesRegressorF64I64 = __napiModule.exports.ExtraTreesRegressorF64I64
export const ExtraTreesRegressorF64U64 = __napiModule.exports.ExtraTreesRegressorF64U64
export const ExtraTreesRegressorParameters = __napiModule.exports.ExtraTreesRegressorParameters
export const F1F64 = __napiModule.exports.F1F64
export const F1f64 = __napiModule.exports.F1f64
export const GaussianNBF64BigU64 = __napiModule.exports.GaussianNBF64BigU64
export const GaussianNBParameters = __napiModule.exports.GaussianNBParameters
export const Generator = __napiModule.exports.Generator
export const HammingI32 = __napiModule.exports.HammingI32
export const HammingU16 = __napiModule.exports.HammingU16
export const HammingU8 = __napiModule.exports.HammingU8
export const HCVScoreI64 = __napiModule.exports.HCVScoreI64
export const HCVScorei64 = __napiModule.exports.HCVScorei64
export const HCVScoreU64 = __napiModule.exports.HCVScoreU64
export const HCVScoreu64 = __napiModule.exports.HCVScoreu64
export const Iris = __napiModule.exports.Iris
export const JsBoxedArrayF32Ref = __napiModule.exports.JsBoxedArrayF32Ref
export const JsBoxedArrayF64Ref = __napiModule.exports.JsBoxedArrayF64Ref
export const JsBoxedArrayI32Ref = __napiModule.exports.JsBoxedArrayI32Ref
export const JsBoxedArrayI64Ref = __napiModule.exports.JsBoxedArrayI64Ref
export const JsBoxedArrayU16Ref = __napiModule.exports.JsBoxedArrayU16Ref
export const JsBoxedArrayU32Ref = __napiModule.exports.JsBoxedArrayU32Ref
export const JsBoxedArrayU8Ref = __napiModule.exports.JsBoxedArrayU8Ref
export const JsDenseMatrixF64Ref = __napiModule.exports.JsDenseMatrixF64Ref
export const JsVecF64Ref = __napiModule.exports.JsVecF64Ref
export const JsVecI64Ref = __napiModule.exports.JsVecI64Ref
export const Kernels = __napiModule.exports.Kernels
export const KFold = __napiModule.exports.KFold
export const KMeansF32I32 = __napiModule.exports.KMeansF32I32
export const KMeansF32I64 = __napiModule.exports.KMeansF32I64
export const KMeansF64I32 = __napiModule.exports.KMeansF64I32
export const KMeansF64I64 = __napiModule.exports.KMeansF64I64
export const KMeansI32I32 = __napiModule.exports.KMeansI32I32
export const KMeansI32I64 = __napiModule.exports.KMeansI32I64
export const KMeansI64I32 = __napiModule.exports.KMeansI64I32
export const KMeansI64I64 = __napiModule.exports.KMeansI64I64
export const KMeansParameters = __napiModule.exports.KMeansParameters
export const KMeansU32I32 = __napiModule.exports.KMeansU32I32
export const KMeansU32I64 = __napiModule.exports.KMeansU32I64
export const KMeansU64I32 = __napiModule.exports.KMeansU64I32
export const KMeansU64I64 = __napiModule.exports.KMeansU64I64
export const KNNClassifierF32EuclidianF32Parameters = __napiModule.exports.KNNClassifierF32EuclidianF32Parameters
export const KNNClassifierF32I32EuclidianF32 = __napiModule.exports.KNNClassifierF32I32EuclidianF32
export const KNNClassifierF32I32MahalanobisF32 = __napiModule.exports.KNNClassifierF32I32MahalanobisF32
export const KNNClassifierF32I32ManhattanF32 = __napiModule.exports.KNNClassifierF32I32ManhattanF32
export const KNNClassifierF32I32MinkowskiF32 = __napiModule.exports.KNNClassifierF32I32MinkowskiF32
export const KNNClassifierF32MahalanobisF32Parameters = __napiModule.exports.KNNClassifierF32MahalanobisF32Parameters
export const KNNClassifierF32ManhattanF32Parameters = __napiModule.exports.KNNClassifierF32ManhattanF32Parameters
export const KNNClassifierF32MinkowskiF32Parameters = __napiModule.exports.KNNClassifierF32MinkowskiF32Parameters
export const KNNClassifierF64EuclidianF64Parameters = __napiModule.exports.KNNClassifierF64EuclidianF64Parameters
export const KNNClassifierF64I32EuclidianF64 = __napiModule.exports.KNNClassifierF64I32EuclidianF64
export const KNNClassifierF64I32MahalanobisF64 = __napiModule.exports.KNNClassifierF64I32MahalanobisF64
export const KNNClassifierF64I32ManhattanF64 = __napiModule.exports.KNNClassifierF64I32ManhattanF64
export const KNNClassifierF64I32MinkowskiF64 = __napiModule.exports.KNNClassifierF64I32MinkowskiF64
export const KNNClassifierF64MahalanobisF64Parameters = __napiModule.exports.KNNClassifierF64MahalanobisF64Parameters
export const KNNClassifierF64ManhattanF64Parameters = __napiModule.exports.KNNClassifierF64ManhattanF64Parameters
export const KNNClassifierF64MinkowskiF64Parameters = __napiModule.exports.KNNClassifierF64MinkowskiF64Parameters
export const KNNClassifierI32EuclidianI32Parameters = __napiModule.exports.KNNClassifierI32EuclidianI32Parameters
export const KNNClassifierI32HammingI32Parameters = __napiModule.exports.KNNClassifierI32HammingI32Parameters
export const KNNClassifierI32I32EuclidianI32 = __napiModule.exports.KNNClassifierI32I32EuclidianI32
export const KNNClassifierI32I32HammingI32 = __napiModule.exports.KNNClassifierI32I32HammingI32
export const KNNClassifierI32I32ManhattanI32 = __napiModule.exports.KNNClassifierI32I32ManhattanI32
export const KNNClassifierI32I32MinkowskiI32 = __napiModule.exports.KNNClassifierI32I32MinkowskiI32
export const KNNClassifierI32ManhattanI32Parameters = __napiModule.exports.KNNClassifierI32ManhattanI32Parameters
export const KNNClassifierI32MinkowskiI32Parameters = __napiModule.exports.KNNClassifierI32MinkowskiI32Parameters
export const KNNClassifierI64EuclidianI64Parameters = __napiModule.exports.KNNClassifierI64EuclidianI64Parameters
export const KNNClassifierI64I32EuclidianI64 = __napiModule.exports.KNNClassifierI64I32EuclidianI64
export const KNNClassifierI64I32ManhattanI64 = __napiModule.exports.KNNClassifierI64I32ManhattanI64
export const KNNClassifierI64I32MinkowskiI64 = __napiModule.exports.KNNClassifierI64I32MinkowskiI64
export const KNNClassifierI64ManhattanI64Parameters = __napiModule.exports.KNNClassifierI64ManhattanI64Parameters
export const KNNClassifierI64MinkowskiI64Parameters = __napiModule.exports.KNNClassifierI64MinkowskiI64Parameters
export const KNNClassifierU16EuclidianU16Parameters = __napiModule.exports.KNNClassifierU16EuclidianU16Parameters
export const KNNClassifierU16HammingU16Parameters = __napiModule.exports.KNNClassifierU16HammingU16Parameters
export const KNNClassifierU16I32EuclidianU16 = __napiModule.exports.KNNClassifierU16I32EuclidianU16
export const KNNClassifierU16I32HammingU16 = __napiModule.exports.KNNClassifierU16I32HammingU16
export const KNNClassifierU32EuclidianU32Parameters = __napiModule.exports.KNNClassifierU32EuclidianU32Parameters
export const KNNClassifierU32I32EuclidianU32 = __napiModule.exports.KNNClassifierU32I32EuclidianU32
export const KNNClassifierU32I32ManhattanU32 = __napiModule.exports.KNNClassifierU32I32ManhattanU32
export const KNNClassifierU32ManhattanU32Parameters = __napiModule.exports.KNNClassifierU32ManhattanU32Parameters
export const KNNClassifierU64EuclidianU64Parameters = __napiModule.exports.KNNClassifierU64EuclidianU64Parameters
export const KNNClassifierU64I32EuclidianU64 = __napiModule.exports.KNNClassifierU64I32EuclidianU64
export const KNNClassifierU64I32ManhattanU64 = __napiModule.exports.KNNClassifierU64I32ManhattanU64
export const KNNClassifierU64ManhattanU64Parameters = __napiModule.exports.KNNClassifierU64ManhattanU64Parameters
export const KNNClassifierU8EuclidianU8Parameters = __napiModule.exports.KNNClassifierU8EuclidianU8Parameters
export const KNNClassifierU8HammingU8Parameters = __napiModule.exports.KNNClassifierU8HammingU8Parameters
export const KNNClassifierU8I32EuclidianU8 = __napiModule.exports.KNNClassifierU8I32EuclidianU8
export const KNNClassifierU8I32HammingU8 = __napiModule.exports.KNNClassifierU8I32HammingU8
export const KNNRegressorF32EuclidianF32Parameters = __napiModule.exports.KNNRegressorF32EuclidianF32Parameters
export const KNNRegressorF32I32EuclidianF32 = __napiModule.exports.KNNRegressorF32I32EuclidianF32
export const KNNRegressorF32I32MahalanobisF32 = __napiModule.exports.KNNRegressorF32I32MahalanobisF32
export const KNNRegressorF32I32ManhattanF32 = __napiModule.exports.KNNRegressorF32I32ManhattanF32
export const KNNRegressorF32I32MinkowskiF32 = __napiModule.exports.KNNRegressorF32I32MinkowskiF32
export const KNNRegressorF32MahalanobisF32Parameters = __napiModule.exports.KNNRegressorF32MahalanobisF32Parameters
export const KNNRegressorF32ManhattanF32Parameters = __napiModule.exports.KNNRegressorF32ManhattanF32Parameters
export const KNNRegressorF32MinkowskiF32Parameters = __napiModule.exports.KNNRegressorF32MinkowskiF32Parameters
export const KNNRegressorF64EuclidianF64Parameters = __napiModule.exports.KNNRegressorF64EuclidianF64Parameters
export const KNNRegressorF64I32EuclidianF64 = __napiModule.exports.KNNRegressorF64I32EuclidianF64
export const KNNRegressorF64I32MahalanobisF64 = __napiModule.exports.KNNRegressorF64I32MahalanobisF64
export const KNNRegressorF64I32ManhattanF64 = __napiModule.exports.KNNRegressorF64I32ManhattanF64
export const KNNRegressorF64I32MinkowskiF64 = __napiModule.exports.KNNRegressorF64I32MinkowskiF64
export const KNNRegressorF64MahalanobisF64Parameters = __napiModule.exports.KNNRegressorF64MahalanobisF64Parameters
export const KNNRegressorF64ManhattanF64Parameters = __napiModule.exports.KNNRegressorF64ManhattanF64Parameters
export const KNNRegressorF64MinkowskiF64Parameters = __napiModule.exports.KNNRegressorF64MinkowskiF64Parameters
export const KNNRegressorI32EuclidianI32Parameters = __napiModule.exports.KNNRegressorI32EuclidianI32Parameters
export const KNNRegressorI32HammingI32Parameters = __napiModule.exports.KNNRegressorI32HammingI32Parameters
export const KNNRegressorI32I32EuclidianI32 = __napiModule.exports.KNNRegressorI32I32EuclidianI32
export const KNNRegressorI32I32HammingI32 = __napiModule.exports.KNNRegressorI32I32HammingI32
export const KNNRegressorI32I32ManhattanI32 = __napiModule.exports.KNNRegressorI32I32ManhattanI32
export const KNNRegressorI32I32MinkowskiI32 = __napiModule.exports.KNNRegressorI32I32MinkowskiI32
export const KNNRegressorI32ManhattanI32Parameters = __napiModule.exports.KNNRegressorI32ManhattanI32Parameters
export const KNNRegressorI32MinkowskiI32Parameters = __napiModule.exports.KNNRegressorI32MinkowskiI32Parameters
export const KNNRegressorI64EuclidianI64Parameters = __napiModule.exports.KNNRegressorI64EuclidianI64Parameters
export const KNNRegressorI64I32EuclidianI64 = __napiModule.exports.KNNRegressorI64I32EuclidianI64
export const KNNRegressorI64I32ManhattanI64 = __napiModule.exports.KNNRegressorI64I32ManhattanI64
export const KNNRegressorI64I32MinkowskiI64 = __napiModule.exports.KNNRegressorI64I32MinkowskiI64
export const KNNRegressorI64ManhattanI64Parameters = __napiModule.exports.KNNRegressorI64ManhattanI64Parameters
export const KNNRegressorI64MinkowskiI64Parameters = __napiModule.exports.KNNRegressorI64MinkowskiI64Parameters
export const KNNRegressorU16EuclidianU16Parameters = __napiModule.exports.KNNRegressorU16EuclidianU16Parameters
export const KNNRegressorU16HammingU16Parameters = __napiModule.exports.KNNRegressorU16HammingU16Parameters
export const KNNRegressorU16I32EuclidianU16 = __napiModule.exports.KNNRegressorU16I32EuclidianU16
export const KNNRegressorU16I32HammingU16 = __napiModule.exports.KNNRegressorU16I32HammingU16
export const KNNRegressorU32EuclidianU32Parameters = __napiModule.exports.KNNRegressorU32EuclidianU32Parameters
export const KNNRegressorU32I32EuclidianU32 = __napiModule.exports.KNNRegressorU32I32EuclidianU32
export const KNNRegressorU32I32ManhattanU32 = __napiModule.exports.KNNRegressorU32I32ManhattanU32
export const KNNRegressorU32ManhattanU32Parameters = __napiModule.exports.KNNRegressorU32ManhattanU32Parameters
export const KNNRegressorU64EuclidianU64Parameters = __napiModule.exports.KNNRegressorU64EuclidianU64Parameters
export const KNNRegressorU64I32EuclidianU64 = __napiModule.exports.KNNRegressorU64I32EuclidianU64
export const KNNRegressorU64I32ManhattanU64 = __napiModule.exports.KNNRegressorU64I32ManhattanU64
export const KNNRegressorU64ManhattanU64Parameters = __napiModule.exports.KNNRegressorU64ManhattanU64Parameters
export const KNNRegressorU8EuclidianU8Parameters = __napiModule.exports.KNNRegressorU8EuclidianU8Parameters
export const KNNRegressorU8HammingU8Parameters = __napiModule.exports.KNNRegressorU8HammingU8Parameters
export const KNNRegressorU8I32EuclidianU8 = __napiModule.exports.KNNRegressorU8I32EuclidianU8
export const KNNRegressorU8I32HammingU8 = __napiModule.exports.KNNRegressorU8I32HammingU8
export const LassoF64BigI64 = __napiModule.exports.LassoF64BigI64
export const LassoF64BigU64 = __napiModule.exports.LassoF64BigU64
export const LassoF64F64 = __napiModule.exports.LassoF64F64
export const LassoF64I64 = __napiModule.exports.LassoF64I64
export const LassoParameters = __napiModule.exports.LassoParameters
export const LinearRegressionF64BigI64 = __napiModule.exports.LinearRegressionF64BigI64
export const LinearRegressionF64BigU64 = __napiModule.exports.LinearRegressionF64BigU64
export const LinearRegressionF64F64 = __napiModule.exports.LinearRegressionF64F64
export const LinearRegressionF64I64 = __napiModule.exports.LinearRegressionF64I64
export const LinearRegressionParameters = __napiModule.exports.LinearRegressionParameters
export const LogisticRegressionF64BigI64 = __napiModule.exports.LogisticRegressionF64BigI64
export const LogisticRegressionF64BigU64 = __napiModule.exports.LogisticRegressionF64BigU64
export const LogisticRegressionF64I64 = __napiModule.exports.LogisticRegressionF64I64
export const LogisticRegressionParametersF64 = __napiModule.exports.LogisticRegressionParametersF64
export const MahalanobisF32 = __napiModule.exports.MahalanobisF32
export const MahalanobisF64 = __napiModule.exports.MahalanobisF64
export const ManhattanF32 = __napiModule.exports.ManhattanF32
export const ManhattanF64 = __napiModule.exports.ManhattanF64
export const ManhattanI32 = __napiModule.exports.ManhattanI32
export const ManhattanI64 = __napiModule.exports.ManhattanI64
export const ManhattanU32 = __napiModule.exports.ManhattanU32
export const ManhattanU64 = __napiModule.exports.ManhattanU64
export const MeanAbsoluteErrorF64 = __napiModule.exports.MeanAbsoluteErrorF64
export const MeanAbsoluteErrorf64 = __napiModule.exports.MeanAbsoluteErrorf64
export const MeanSquareErrorF64 = __napiModule.exports.MeanSquareErrorF64
export const MeanSquareErrorf64 = __napiModule.exports.MeanSquareErrorf64
export const MinkowskiF32 = __napiModule.exports.MinkowskiF32
export const MinkowskiF64 = __napiModule.exports.MinkowskiF64
export const MinkowskiI32 = __napiModule.exports.MinkowskiI32
export const MinkowskiI64 = __napiModule.exports.MinkowskiI64
export const MultinomialNBParameters = __napiModule.exports.MultinomialNBParameters
export const MultinomialNBU64BigU64 = __napiModule.exports.MultinomialNBU64BigU64
export const OneHotEncoderF32 = __napiModule.exports.OneHotEncoderF32
export const OneHotEncoderF64 = __napiModule.exports.OneHotEncoderF64
export const OneHotEncoderParameters = __napiModule.exports.OneHotEncoderParameters
export const PCAF32 = __napiModule.exports.PCAF32
export const PCAF64 = __napiModule.exports.PCAF64
export const PCAParameters = __napiModule.exports.PCAParameters
export const PrecisionF64 = __napiModule.exports.PrecisionF64
export const Precisionf64 = __napiModule.exports.Precisionf64
export const R2F64 = __napiModule.exports.R2F64
export const R2f64 = __napiModule.exports.R2f64
export const R2I64 = __napiModule.exports.R2I64
export const R2i64 = __napiModule.exports.R2i64
export const R2U64 = __napiModule.exports.R2U64
export const R2u64 = __napiModule.exports.R2u64
export const RandomForestClassifierF64BigI64 = __napiModule.exports.RandomForestClassifierF64BigI64
export const RandomForestClassifierF64BigU64 = __napiModule.exports.RandomForestClassifierF64BigU64
export const RandomForestClassifierF64I64 = __napiModule.exports.RandomForestClassifierF64I64
export const RandomForestClassifierParameters = __napiModule.exports.RandomForestClassifierParameters
export const RandomForestRegressorF64BigI64 = __napiModule.exports.RandomForestRegressorF64BigI64
export const RandomForestRegressorF64BigU64 = __napiModule.exports.RandomForestRegressorF64BigU64
export const RandomForestRegressorF64F64 = __napiModule.exports.RandomForestRegressorF64F64
export const RandomForestRegressorF64I64 = __napiModule.exports.RandomForestRegressorF64I64
export const RandomForestRegressorParameters = __napiModule.exports.RandomForestRegressorParameters
export const RecallF64 = __napiModule.exports.RecallF64
export const Recallf64 = __napiModule.exports.Recallf64
export const RidgeRegressionF32F32 = __napiModule.exports.RidgeRegressionF32F32
export const RidgeRegressionF32F64 = __napiModule.exports.RidgeRegressionF32F64
export const RidgeRegressionF32Parameters = __napiModule.exports.RidgeRegressionF32Parameters
export const RidgeRegressionF64F32 = __napiModule.exports.RidgeRegressionF64F32
export const RidgeRegressionF64F64 = __napiModule.exports.RidgeRegressionF64F64
export const RidgeRegressionF64Parameters = __napiModule.exports.RidgeRegressionF64Parameters
export const StandardScalerF32 = __napiModule.exports.StandardScalerF32
export const StandardScalerF64 = __napiModule.exports.StandardScalerF64
export const StandardScalerParameters = __napiModule.exports.StandardScalerParameters
export const SVCF64I64 = __napiModule.exports.SVCF64I64
export const SVCParametersF64I64 = __napiModule.exports.SVCParametersF64I64
export const SVDF32 = __napiModule.exports.SVDF32
export const SVDF64 = __napiModule.exports.SVDF64
export const SVDF64DenseMatrixF64 = __napiModule.exports.SVDF64DenseMatrixF64
export const SVDParameters = __napiModule.exports.SVDParameters
export const SVRF64 = __napiModule.exports.SVRF64
export const SVRParametersF64 = __napiModule.exports.SVRParametersF64
export const VecF64 = __napiModule.exports.VecF64
export const VecI64 = __napiModule.exports.VecI64
export const crossValidateElasticNetF64F64 = __napiModule.exports.crossValidateElasticNetF64F64
export const crossValidateElasticNetF64I64 = __napiModule.exports.crossValidateElasticNetF64I64
export const crossValidateLogisticRegressionF64I64 = __napiModule.exports.crossValidateLogisticRegressionF64I64
export const KNNAlgorithmName = __napiModule.exports.KNNAlgorithmName
export const KNNWeightFunction = __napiModule.exports.KNNWeightFunction
export const LinearRegressionSolverName = __napiModule.exports.LinearRegressionSolverName
export const LogisticRegressionSolverName = __napiModule.exports.LogisticRegressionSolverName
export const RidgeRegressionSolverName = __napiModule.exports.RidgeRegressionSolverName
export const SplitCriterion = __napiModule.exports.SplitCriterion
export const trainTestSplitF32F32 = __napiModule.exports.trainTestSplitF32F32
export const trainTestSplitF32F64 = __napiModule.exports.trainTestSplitF32F64
export const trainTestSplitF32I32 = __napiModule.exports.trainTestSplitF32I32
export const trainTestSplitF32I64 = __napiModule.exports.trainTestSplitF32I64
export const trainTestSplitF32U64 = __napiModule.exports.trainTestSplitF32U64
export const trainTestSplitF64F32 = __napiModule.exports.trainTestSplitF64F32
export const trainTestSplitF64F64 = __napiModule.exports.trainTestSplitF64F64
export const trainTestSplitF64I32 = __napiModule.exports.trainTestSplitF64I32
export const trainTestSplitF64I64 = __napiModule.exports.trainTestSplitF64I64
export const trainTestSplitF64U64 = __napiModule.exports.trainTestSplitF64U64
export const trainTestSplitI32F32 = __napiModule.exports.trainTestSplitI32F32
export const trainTestSplitI32F64 = __napiModule.exports.trainTestSplitI32F64
export const trainTestSplitI32I32 = __napiModule.exports.trainTestSplitI32I32
export const trainTestSplitI32I64 = __napiModule.exports.trainTestSplitI32I64
export const trainTestSplitI32U64 = __napiModule.exports.trainTestSplitI32U64
export const trainTestSplitI64F32 = __napiModule.exports.trainTestSplitI64F32
export const trainTestSplitI64F64 = __napiModule.exports.trainTestSplitI64F64
export const trainTestSplitI64I32 = __napiModule.exports.trainTestSplitI64I32
export const trainTestSplitI64I64 = __napiModule.exports.trainTestSplitI64I64
export const trainTestSplitI64U64 = __napiModule.exports.trainTestSplitI64U64
export const trainTestSplitU16F32 = __napiModule.exports.trainTestSplitU16F32
export const trainTestSplitU16F64 = __napiModule.exports.trainTestSplitU16F64
export const trainTestSplitU16I32 = __napiModule.exports.trainTestSplitU16I32
export const trainTestSplitU16I64 = __napiModule.exports.trainTestSplitU16I64
export const trainTestSplitU16U64 = __napiModule.exports.trainTestSplitU16U64
export const trainTestSplitU32F32 = __napiModule.exports.trainTestSplitU32F32
export const trainTestSplitU32F64 = __napiModule.exports.trainTestSplitU32F64
export const trainTestSplitU32I32 = __napiModule.exports.trainTestSplitU32I32
export const trainTestSplitU32I64 = __napiModule.exports.trainTestSplitU32I64
export const trainTestSplitU32U64 = __napiModule.exports.trainTestSplitU32U64
export const trainTestSplitU64F32 = __napiModule.exports.trainTestSplitU64F32
export const trainTestSplitU64F64 = __napiModule.exports.trainTestSplitU64F64
export const trainTestSplitU64I32 = __napiModule.exports.trainTestSplitU64I32
export const trainTestSplitU64I64 = __napiModule.exports.trainTestSplitU64I64
export const trainTestSplitU64U64 = __napiModule.exports.trainTestSplitU64U64
export const trainTestSplitU8F32 = __napiModule.exports.trainTestSplitU8F32
export const trainTestSplitU8F64 = __napiModule.exports.trainTestSplitU8F64
export const trainTestSplitU8I32 = __napiModule.exports.trainTestSplitU8I32
export const trainTestSplitU8I64 = __napiModule.exports.trainTestSplitU8I64
export const trainTestSplitU8U64 = __napiModule.exports.trainTestSplitU8U64
