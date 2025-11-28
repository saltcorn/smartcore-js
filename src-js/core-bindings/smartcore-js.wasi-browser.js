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
export const BernoulliNB = __napiModule.exports.BernoulliNB
export const BernoulliNBBuilder = __napiModule.exports.BernoulliNBBuilder
export const Boston = __napiModule.exports.Boston
export const BreastCancer = __napiModule.exports.BreastCancer
export const CategoricalNB = __napiModule.exports.CategoricalNB
export const CategoricalNBBuilder = __napiModule.exports.CategoricalNBBuilder
export const dataset = __napiModule.exports.dataset
export const Dataset = __napiModule.exports.Dataset
export const DatasetF64F64 = __napiModule.exports.DatasetF64F64
export const DatasetF64F64JsVecRef = __napiModule.exports.DatasetF64F64JsVecRef
export const DatasetF64I32 = __napiModule.exports.DatasetF64I32
export const DatasetF64I32JsVecRef = __napiModule.exports.DatasetF64I32JsVecRef
export const DatasetI32I32 = __napiModule.exports.DatasetI32I32
export const DBSCAN = __napiModule.exports.DBSCAN
export const DBSCANBuilder = __napiModule.exports.DBSCANBuilder
export const DecisionTreeClassifierI64I64 = __napiModule.exports.DecisionTreeClassifierI64I64
export const DecisionTreeClassifierParameters = __napiModule.exports.DecisionTreeClassifierParameters
export const DecisionTreeRegressorI64I64 = __napiModule.exports.DecisionTreeRegressorI64I64
export const DecisionTreeRegressorParameters = __napiModule.exports.DecisionTreeRegressorParameters
export const DenseMatrix = __napiModule.exports.DenseMatrix
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
export const ElasticNet = __napiModule.exports.ElasticNet
export const ElasticNetBuilder = __napiModule.exports.ElasticNetBuilder
export const EuclidianF32 = __napiModule.exports.EuclidianF32
export const EuclidianF64 = __napiModule.exports.EuclidianF64
export const EuclidianI32 = __napiModule.exports.EuclidianI32
export const EuclidianI64 = __napiModule.exports.EuclidianI64
export const EuclidianU16 = __napiModule.exports.EuclidianU16
export const EuclidianU32 = __napiModule.exports.EuclidianU32
export const EuclidianU64 = __napiModule.exports.EuclidianU64
export const EuclidianU8 = __napiModule.exports.EuclidianU8
export const ExtraTreesRegressor = __napiModule.exports.ExtraTreesRegressor
export const ExtraTreesRegressorBuilder = __napiModule.exports.ExtraTreesRegressorBuilder
export const F1F64 = __napiModule.exports.F1F64
export const F1f64 = __napiModule.exports.F1f64
export const GaussianNB = __napiModule.exports.GaussianNB
export const GaussianNBBuilder = __napiModule.exports.GaussianNBBuilder
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
export const KMeans = __napiModule.exports.KMeans
export const KMeansBuilder = __napiModule.exports.KMeansBuilder
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
export const KNNRegressorF32F32EuclidianF32 = __napiModule.exports.KNNRegressorF32F32EuclidianF32
export const KNNRegressorF32F32MahalanobisF32 = __napiModule.exports.KNNRegressorF32F32MahalanobisF32
export const KNNRegressorF32F32ManhattanF32 = __napiModule.exports.KNNRegressorF32F32ManhattanF32
export const KNNRegressorF32F32MinkowskiF32 = __napiModule.exports.KNNRegressorF32F32MinkowskiF32
export const KNNRegressorF32MahalanobisF32Parameters = __napiModule.exports.KNNRegressorF32MahalanobisF32Parameters
export const KNNRegressorF32ManhattanF32Parameters = __napiModule.exports.KNNRegressorF32ManhattanF32Parameters
export const KNNRegressorF32MinkowskiF32Parameters = __napiModule.exports.KNNRegressorF32MinkowskiF32Parameters
export const KNNRegressorF64EuclidianF64Parameters = __napiModule.exports.KNNRegressorF64EuclidianF64Parameters
export const KNNRegressorF64F32EuclidianF64 = __napiModule.exports.KNNRegressorF64F32EuclidianF64
export const KNNRegressorF64F32MahalanobisF64 = __napiModule.exports.KNNRegressorF64F32MahalanobisF64
export const KNNRegressorF64F32ManhattanF64 = __napiModule.exports.KNNRegressorF64F32ManhattanF64
export const KNNRegressorF64F32MinkowskiF64 = __napiModule.exports.KNNRegressorF64F32MinkowskiF64
export const KNNRegressorF64MahalanobisF64Parameters = __napiModule.exports.KNNRegressorF64MahalanobisF64Parameters
export const KNNRegressorF64ManhattanF64Parameters = __napiModule.exports.KNNRegressorF64ManhattanF64Parameters
export const KNNRegressorF64MinkowskiF64Parameters = __napiModule.exports.KNNRegressorF64MinkowskiF64Parameters
export const KNNRegressorI32EuclidianI32Parameters = __napiModule.exports.KNNRegressorI32EuclidianI32Parameters
export const KNNRegressorI32F32EuclidianI32 = __napiModule.exports.KNNRegressorI32F32EuclidianI32
export const KNNRegressorI32F32HammingI32 = __napiModule.exports.KNNRegressorI32F32HammingI32
export const KNNRegressorI32F32ManhattanI32 = __napiModule.exports.KNNRegressorI32F32ManhattanI32
export const KNNRegressorI32F32MinkowskiI32 = __napiModule.exports.KNNRegressorI32F32MinkowskiI32
export const KNNRegressorI32HammingI32Parameters = __napiModule.exports.KNNRegressorI32HammingI32Parameters
export const KNNRegressorI32ManhattanI32Parameters = __napiModule.exports.KNNRegressorI32ManhattanI32Parameters
export const KNNRegressorI32MinkowskiI32Parameters = __napiModule.exports.KNNRegressorI32MinkowskiI32Parameters
export const KNNRegressorI64EuclidianI64Parameters = __napiModule.exports.KNNRegressorI64EuclidianI64Parameters
export const KNNRegressorI64F32EuclidianI64 = __napiModule.exports.KNNRegressorI64F32EuclidianI64
export const KNNRegressorI64F32ManhattanI64 = __napiModule.exports.KNNRegressorI64F32ManhattanI64
export const KNNRegressorI64F32MinkowskiI64 = __napiModule.exports.KNNRegressorI64F32MinkowskiI64
export const KNNRegressorI64ManhattanI64Parameters = __napiModule.exports.KNNRegressorI64ManhattanI64Parameters
export const KNNRegressorI64MinkowskiI64Parameters = __napiModule.exports.KNNRegressorI64MinkowskiI64Parameters
export const KNNRegressorU16EuclidianU16Parameters = __napiModule.exports.KNNRegressorU16EuclidianU16Parameters
export const KNNRegressorU16F32EuclidianU16 = __napiModule.exports.KNNRegressorU16F32EuclidianU16
export const KNNRegressorU16F32HammingU16 = __napiModule.exports.KNNRegressorU16F32HammingU16
export const KNNRegressorU16HammingU16Parameters = __napiModule.exports.KNNRegressorU16HammingU16Parameters
export const KNNRegressorU32EuclidianU32Parameters = __napiModule.exports.KNNRegressorU32EuclidianU32Parameters
export const KNNRegressorU32F32EuclidianU32 = __napiModule.exports.KNNRegressorU32F32EuclidianU32
export const KNNRegressorU32F32ManhattanU32 = __napiModule.exports.KNNRegressorU32F32ManhattanU32
export const KNNRegressorU32ManhattanU32Parameters = __napiModule.exports.KNNRegressorU32ManhattanU32Parameters
export const KNNRegressorU64EuclidianU64Parameters = __napiModule.exports.KNNRegressorU64EuclidianU64Parameters
export const KNNRegressorU64F32EuclidianU64 = __napiModule.exports.KNNRegressorU64F32EuclidianU64
export const KNNRegressorU64F32ManhattanU64 = __napiModule.exports.KNNRegressorU64F32ManhattanU64
export const KNNRegressorU64ManhattanU64Parameters = __napiModule.exports.KNNRegressorU64ManhattanU64Parameters
export const KNNRegressorU8EuclidianU8Parameters = __napiModule.exports.KNNRegressorU8EuclidianU8Parameters
export const KNNRegressorU8F32EuclidianU8 = __napiModule.exports.KNNRegressorU8F32EuclidianU8
export const KNNRegressorU8F32HammingU8 = __napiModule.exports.KNNRegressorU8F32HammingU8
export const KNNRegressorU8HammingU8Parameters = __napiModule.exports.KNNRegressorU8HammingU8Parameters
export const Lasso = __napiModule.exports.Lasso
export const LassoBuilder = __napiModule.exports.LassoBuilder
export const LinearRegression = __napiModule.exports.LinearRegression
export const LinearRegressionBuilder = __napiModule.exports.LinearRegressionBuilder
export const LogisticRegression = __napiModule.exports.LogisticRegression
export const LogisticRegressionBuilder = __napiModule.exports.LogisticRegressionBuilder
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
export const MultinomialNB = __napiModule.exports.MultinomialNB
export const MultinomialNBBuilder = __napiModule.exports.MultinomialNBBuilder
export const OneHotEncoderF32 = __napiModule.exports.OneHotEncoderF32
export const OneHotEncoderF64 = __napiModule.exports.OneHotEncoderF64
export const OneHotEncoderParameters = __napiModule.exports.OneHotEncoderParameters
export const PCA = __napiModule.exports.PCA
export const PCABuilder = __napiModule.exports.PCABuilder
export const PrecisionF64 = __napiModule.exports.PrecisionF64
export const Precisionf64 = __napiModule.exports.Precisionf64
export const R2F64 = __napiModule.exports.R2F64
export const R2f64 = __napiModule.exports.R2f64
export const R2I64 = __napiModule.exports.R2I64
export const R2i64 = __napiModule.exports.R2i64
export const R2U64 = __napiModule.exports.R2U64
export const R2u64 = __napiModule.exports.R2u64
export const RandomForestClassifier = __napiModule.exports.RandomForestClassifier
export const RandomForestClassifierBuilder = __napiModule.exports.RandomForestClassifierBuilder
export const RandomForestRegressor = __napiModule.exports.RandomForestRegressor
export const RandomForestRegressorBuilder = __napiModule.exports.RandomForestRegressorBuilder
export const RecallF64 = __napiModule.exports.RecallF64
export const Recallf64 = __napiModule.exports.Recallf64
export const RidgeRegression = __napiModule.exports.RidgeRegression
export const RidgeRegressionBuilder = __napiModule.exports.RidgeRegressionBuilder
export const StandardScalerF32 = __napiModule.exports.StandardScalerF32
export const StandardScalerF64 = __napiModule.exports.StandardScalerF64
export const StandardScalerParameters = __napiModule.exports.StandardScalerParameters
export const SVCF64I64 = __napiModule.exports.SVCF64I64
export const SVCParametersF64I64 = __napiModule.exports.SVCParametersF64I64
export const SVD = __napiModule.exports.SVD
export const SVDBuilder = __napiModule.exports.SVDBuilder
export const SVDF64DenseMatrixF64 = __napiModule.exports.SVDF64DenseMatrixF64
export const SVRF64 = __napiModule.exports.SVRF64
export const SVRParametersF64 = __napiModule.exports.SVRParametersF64
export const VecF64 = __napiModule.exports.VecF64
export const VecI64 = __napiModule.exports.VecI64
export const WrappedNumber = __napiModule.exports.WrappedNumber
export const BernoulliNBPredictOutputType = __napiModule.exports.BernoulliNBPredictOutputType
export const DenseMatrixType = __napiModule.exports.DenseMatrixType
export const DistanceVariantType = __napiModule.exports.DistanceVariantType
export const ElasticNetPredictOutputType = __napiModule.exports.ElasticNetPredictOutputType
export const ExtraTreesRegressorPredictOutputType = __napiModule.exports.ExtraTreesRegressorPredictOutputType
export const GaussianNBPredictOutputType = __napiModule.exports.GaussianNBPredictOutputType
export const KMeansPredictOutputType = __napiModule.exports.KMeansPredictOutputType
export const KNNAlgorithmName = __napiModule.exports.KNNAlgorithmName
export const KNNWeightFunction = __napiModule.exports.KNNWeightFunction
export const LassoPredictOutputType = __napiModule.exports.LassoPredictOutputType
export const LinearRegressionPredictOutputType = __napiModule.exports.LinearRegressionPredictOutputType
export const LinearRegressionSolverName = __napiModule.exports.LinearRegressionSolverName
export const LogisticRegressionPredictOutputType = __napiModule.exports.LogisticRegressionPredictOutputType
export const LogisticRegressionSolverName = __napiModule.exports.LogisticRegressionSolverName
export const MultinomialNBPredictOutputType = __napiModule.exports.MultinomialNBPredictOutputType
export const RandomForestClassifierPredictOutputType = __napiModule.exports.RandomForestClassifierPredictOutputType
export const RandomForestRegressorPredictOutputType = __napiModule.exports.RandomForestRegressorPredictOutputType
export const RidgeRegressionPredictOutputType = __napiModule.exports.RidgeRegressionPredictOutputType
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
export const TypedArrayType = __napiModule.exports.TypedArrayType
