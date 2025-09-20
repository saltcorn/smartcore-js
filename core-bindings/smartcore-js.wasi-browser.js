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
export const AccuracyI64 = __napiModule.exports.AccuracyI64
export const Accuracyi64 = __napiModule.exports.Accuracyi64
export const AUCF64 = __napiModule.exports.AUCF64
export const AUCf64 = __napiModule.exports.AUCf64
export const BernoulliNBF64U64 = __napiModule.exports.BernoulliNBF64U64
export const BernoulliNBParametersF64 = __napiModule.exports.BernoulliNBParametersF64
export const Boston = __napiModule.exports.Boston
export const BreastCancer = __napiModule.exports.BreastCancer
export const CategoricalNBParameters = __napiModule.exports.CategoricalNBParameters
export const CategoricalNBU64 = __napiModule.exports.CategoricalNBU64
export const CrossValidationResult = __napiModule.exports.CrossValidationResult
export const dataset = __napiModule.exports.dataset
export const Dataset = __napiModule.exports.Dataset
export const DatasetF64F64 = __napiModule.exports.DatasetF64F64
export const DatasetF64F64JsVecRef = __napiModule.exports.DatasetF64F64JsVecRef
export const DatasetF64I64 = __napiModule.exports.DatasetF64I64
export const DatasetF64I64JsVecRef = __napiModule.exports.DatasetF64I64JsVecRef
export const DBSCANF64F64 = __napiModule.exports.DBSCANF64F64
export const DecisionTreeClassifierI64I64 = __napiModule.exports.DecisionTreeClassifierI64I64
export const DecisionTreeClassifierParameters = __napiModule.exports.DecisionTreeClassifierParameters
export const DecisionTreeRegressorI64I64 = __napiModule.exports.DecisionTreeRegressorI64I64
export const DecisionTreeRegressorParameters = __napiModule.exports.DecisionTreeRegressorParameters
export const DenseMatrixF64 = __napiModule.exports.DenseMatrixF64
export const DenseMatrixI64 = __napiModule.exports.DenseMatrixI64
export const DenseMatrixU64 = __napiModule.exports.DenseMatrixU64
export const Diabetes = __napiModule.exports.Diabetes
export const Digits = __napiModule.exports.Digits
export const ElasticNetF64F64 = __napiModule.exports.ElasticNetF64F64
export const ElasticNetF64I64 = __napiModule.exports.ElasticNetF64I64
export const ElasticNetParameters = __napiModule.exports.ElasticNetParameters
export const Euclidianf64 = __napiModule.exports.Euclidianf64
export const EuclidianF64 = __napiModule.exports.EuclidianF64
export const EuclidianF64DBSCANF64Parameters = __napiModule.exports.EuclidianF64DBSCANF64Parameters
export const Euclidiani64 = __napiModule.exports.Euclidiani64
export const EuclidianI64 = __napiModule.exports.EuclidianI64
export const ExtraTreesRegressorF64F64 = __napiModule.exports.ExtraTreesRegressorF64F64
export const ExtraTreesRegressorF64I64 = __napiModule.exports.ExtraTreesRegressorF64I64
export const ExtraTreesRegressorParameters = __napiModule.exports.ExtraTreesRegressorParameters
export const F1F64 = __napiModule.exports.F1F64
export const F1f64 = __napiModule.exports.F1f64
export const GaussianNBF64U64 = __napiModule.exports.GaussianNBF64U64
export const GaussianNBParameters = __napiModule.exports.GaussianNBParameters
export const Generator = __napiModule.exports.Generator
export const HammingF64 = __napiModule.exports.HammingF64
export const HammingF64DBSCANF64Parameters = __napiModule.exports.HammingF64DBSCANF64Parameters
export const HammingI64 = __napiModule.exports.HammingI64
export const HCVScoreI64 = __napiModule.exports.HCVScoreI64
export const HCVScorei64 = __napiModule.exports.HCVScorei64
export const Iris = __napiModule.exports.Iris
export const JsBoxedArrayF32Ref = __napiModule.exports.JsBoxedArrayF32Ref
export const JsBoxedArrayF64Ref = __napiModule.exports.JsBoxedArrayF64Ref
export const JsDenseMatrixF64Ref = __napiModule.exports.JsDenseMatrixF64Ref
export const JsVecF64Ref = __napiModule.exports.JsVecF64Ref
export const JsVecI64Ref = __napiModule.exports.JsVecI64Ref
export const Kernels = __napiModule.exports.Kernels
export const KFold = __napiModule.exports.KFold
export const KMeansF64F64 = __napiModule.exports.KMeansF64F64
export const KMeansF64I64 = __napiModule.exports.KMeansF64I64
export const KMeansParameters = __napiModule.exports.KMeansParameters
export const KNNClassifierF64I64 = __napiModule.exports.KNNClassifierF64I64
export const KNNRegressorF64F64 = __napiModule.exports.KNNRegressorF64F64
export const KNNRegressorF64I64 = __napiModule.exports.KNNRegressorF64I64
export const KNNRegressorParametersF64EuclidianF64 = __napiModule.exports.KNNRegressorParametersF64EuclidianF64
export const EuclidianF64KNNRegressorParametersF64 = __napiModule.exports.EuclidianF64KNNRegressorParametersF64
export const KNNRegressorParametersF64HammingF64 = __napiModule.exports.KNNRegressorParametersF64HammingF64
export const HammingF64KNNRegressorParametersF64 = __napiModule.exports.HammingF64KNNRegressorParametersF64
export const LassoF64F64 = __napiModule.exports.LassoF64F64
export const LassoF64I64 = __napiModule.exports.LassoF64I64
export const LassoParameters = __napiModule.exports.LassoParameters
export const LinearRegressionF64F64 = __napiModule.exports.LinearRegressionF64F64
export const LinearRegressionF64I64 = __napiModule.exports.LinearRegressionF64I64
export const LinearRegressionParameters = __napiModule.exports.LinearRegressionParameters
export const LogisticRegressionF64I64 = __napiModule.exports.LogisticRegressionF64I64
export const LogisticRegressionParametersF64 = __napiModule.exports.LogisticRegressionParametersF64
export const MahalanobisF64 = __napiModule.exports.MahalanobisF64
export const ManhattanF64 = __napiModule.exports.ManhattanF64
export const ManhattanI64 = __napiModule.exports.ManhattanI64
export const MeanAbsoluteErrorF64 = __napiModule.exports.MeanAbsoluteErrorF64
export const MeanAbsoluteErrorf64 = __napiModule.exports.MeanAbsoluteErrorf64
export const MeanSquareErrorF64 = __napiModule.exports.MeanSquareErrorF64
export const MeanSquareErrorf64 = __napiModule.exports.MeanSquareErrorf64
export const MinkowskiF64 = __napiModule.exports.MinkowskiF64
export const MinkowskiI64 = __napiModule.exports.MinkowskiI64
export const MultinomialNBParameters = __napiModule.exports.MultinomialNBParameters
export const MultinomialNBU64U64 = __napiModule.exports.MultinomialNBU64U64
export const PCAF64 = __napiModule.exports.PCAF64
export const PCAParameters = __napiModule.exports.PCAParameters
export const PrecisionF64 = __napiModule.exports.PrecisionF64
export const Precisionf64 = __napiModule.exports.Precisionf64
export const R2F64 = __napiModule.exports.R2F64
export const R2f64 = __napiModule.exports.R2f64
export const R2I64 = __napiModule.exports.R2I64
export const R2i64 = __napiModule.exports.R2i64
export const RandomForestClassifierF64I64 = __napiModule.exports.RandomForestClassifierF64I64
export const RandomForestClassifierParameters = __napiModule.exports.RandomForestClassifierParameters
export const RandomForestRegressorF64F64 = __napiModule.exports.RandomForestRegressorF64F64
export const RandomForestRegressorF64I64 = __napiModule.exports.RandomForestRegressorF64I64
export const RandomForestRegressorParameters = __napiModule.exports.RandomForestRegressorParameters
export const RecallF64 = __napiModule.exports.RecallF64
export const Recallf64 = __napiModule.exports.Recallf64
export const RidgeRegressionF64F64 = __napiModule.exports.RidgeRegressionF64F64
export const RidgeRegressionParametersF64 = __napiModule.exports.RidgeRegressionParametersF64
export const SVCF64I64 = __napiModule.exports.SVCF64I64
export const SVCParametersF64I64 = __napiModule.exports.SVCParametersF64I64
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
export const trainTestSplitF64F64 = __napiModule.exports.trainTestSplitF64F64
export const trainTestSplitF64I64 = __napiModule.exports.trainTestSplitF64I64
