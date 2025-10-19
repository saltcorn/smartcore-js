import { type TransformerProvider } from '../../../estimator.js'
import ExtraTreesRegressorF32F32Provider from './extra_trees_regressor_f32_f32_provider.js'
import ExtraTreesRegressorF32F64Provider from './extra_trees_regressor_f32_f64_provider.js'
import ExtraTreesRegressorF32I32Provider from './extra_trees_regressor_f32_i32_provider.js'
import ExtraTreesRegressorF32I64Provider from './extra_trees_regressor_f32_i64_provider.js'
import ExtraTreesRegressorF32U64Provider from './extra_trees_regressor_f32_u64_provider.js'
import ExtraTreesRegressorF64F32Provider from './extra_trees_regressor_f64_f32_provider.js'
import ExtraTreesRegressorF64F64Provider from './extra_trees_regressor_f64_f64_provider.js'
import ExtraTreesRegressorF64I32Provider from './extra_trees_regressor_f64_i32_provider.js'
import ExtraTreesRegressorF64I64Provider from './extra_trees_regressor_f64_i64_provider.js'
import ExtraTreesRegressorF64U64Provider from './extra_trees_regressor_f64_u64_provider.js'
import type { IExtraTreesRegressorBaseParameters } from '../index.js'
import type { XTypeStr, YTypeStr } from '../../index.js'

const F32PredictorProvidersMap: Map<
  YTypeStr,
  TransformerProvider<IExtraTreesRegressorBaseParameters, any, any>
> = new Map()
F32PredictorProvidersMap.set('f32', new ExtraTreesRegressorF32F32Provider())
F32PredictorProvidersMap.set('f64', new ExtraTreesRegressorF32F64Provider())
F32PredictorProvidersMap.set('i32', new ExtraTreesRegressorF32I32Provider())
F32PredictorProvidersMap.set('i64', new ExtraTreesRegressorF32I64Provider())
F32PredictorProvidersMap.set('u64', new ExtraTreesRegressorF32U64Provider())

const F64PredictorProvidersMap: Map<
  YTypeStr,
  TransformerProvider<IExtraTreesRegressorBaseParameters, any, any>
> = new Map()
F64PredictorProvidersMap.set('f32', new ExtraTreesRegressorF64F32Provider())
F64PredictorProvidersMap.set('f64', new ExtraTreesRegressorF64F64Provider())
F64PredictorProvidersMap.set('i32', new ExtraTreesRegressorF64I32Provider())
F64PredictorProvidersMap.set('i64', new ExtraTreesRegressorF64I64Provider())
F64PredictorProvidersMap.set('u64', new ExtraTreesRegressorF64U64Provider())

const PredictorProvidersMap: Map<
  XTypeStr,
  Map<YTypeStr, TransformerProvider<IExtraTreesRegressorBaseParameters, any, any>>
> = new Map()
PredictorProvidersMap.set('f32', F32PredictorProvidersMap)
PredictorProvidersMap.set('f64', F64PredictorProvidersMap)

interface IExtraTreesRegressorParametersRs {
  withMaxDepth(maxDepth: number): void
  withMinSamplesLeaf(minSamplesLeaf: bigint): void
  withMinSamplesSplit(minSamplesSplit: bigint): void
  withNTrees(nTrees: number): void
  withM(m: number): void
  withKeepSamples(keepSamples: boolean): void
  withSeed(seed: number): void
}

function setExtraTreesRegressorParametersValues(
  parameters: IExtraTreesRegressorParametersRs,
  config: IExtraTreesRegressorBaseParameters,
) {
  if (config.maxDepth !== undefined) {
    parameters.withMaxDepth(config.maxDepth)
  }
  if (config.minSamplesLeaf !== undefined) {
    parameters.withMinSamplesLeaf(BigInt(config.minSamplesLeaf))
  }
  if (config.minSamplesSplit !== undefined) {
    parameters.withMinSamplesSplit(BigInt(config.minSamplesSplit))
  }
  if (config.nTrees !== undefined) {
    parameters.withNTrees(config.nTrees)
  }
  if (config.m !== undefined) {
    parameters.withM(config.m)
  }
  if (config.keepSamples !== undefined) {
    parameters.withKeepSamples(config.keepSamples)
  }
  if (config.seed !== undefined) {
    parameters.withSeed(config.seed)
  }
}

export { PredictorProvidersMap, setExtraTreesRegressorParametersValues }
