import { type PredictorProvider } from '../../../estimator.js'
import RandomForestClassifierF32I32Provider from './random_forest_classifier_f32_i32_provider.js'
import RandomForestClassifierF32I64Provider from './random_forest_classifier_f32_i64_provider.js'
import RandomForestClassifierF32U64Provider from './random_forest_classifier_f32_u64_provider.js'
import RandomForestClassifierF64I32Provider from './random_forest_classifier_f64_i32_provider.js'
import RandomForestClassifierF64I64Provider from './random_forest_classifier_f64_i64_provider.js'
import RandomForestClassifierF64U64Provider from './random_forest_classifier_f64_u64_provider.js'
import type { IRandomForestClassifierBaseParameters } from '../index.js'
import type { SplitCriterion } from '../../../core-bindings/index.js'

type XTypeStr = 'f32' | 'f64'
type YTypeStr = 'i64' | 'u64' | 'i32'

const F32PredictorProvidersMap: Map<
  YTypeStr,
  PredictorProvider<IRandomForestClassifierBaseParameters, any, any>
> = new Map()
F32PredictorProvidersMap.set('i32', new RandomForestClassifierF32I32Provider())
F32PredictorProvidersMap.set('i64', new RandomForestClassifierF32I64Provider())
F32PredictorProvidersMap.set('u64', new RandomForestClassifierF32U64Provider())

const F64PredictorProvidersMap: Map<
  YTypeStr,
  PredictorProvider<IRandomForestClassifierBaseParameters, any, any>
> = new Map()
F64PredictorProvidersMap.set('i32', new RandomForestClassifierF64I32Provider())
F64PredictorProvidersMap.set('i64', new RandomForestClassifierF64I64Provider())
F64PredictorProvidersMap.set('u64', new RandomForestClassifierF64U64Provider())

const PredictorProvidersMap: Map<
  XTypeStr,
  Map<YTypeStr, PredictorProvider<IRandomForestClassifierBaseParameters, any, any>>
> = new Map()
PredictorProvidersMap.set('f32', F32PredictorProvidersMap)
PredictorProvidersMap.set('f64', F64PredictorProvidersMap)

interface IRandomForestClassifierParametersRs {
  withCriterion(criterion: SplitCriterion): void
  withMaxDepth(maxDepth: number): void
  withMinSamplesLeaf(minSamplesLeaf: bigint): void
  withMinSamplesSplit(minSamplesSplit: bigint): void
  withNTrees(nTrees: number): void
  withM(m: number): void
  withKeepSamples(keepSamples: boolean): void
  withSeed(seed: number): void
}

function setRandomForestClassifierParametersValues(
  parameters: IRandomForestClassifierParametersRs,
  config: IRandomForestClassifierBaseParameters,
) {
  if (config.splitCriterion !== undefined) {
    parameters.withCriterion(config.splitCriterion)
  }
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

export { PredictorProvidersMap, setRandomForestClassifierParametersValues }
export type { XTypeStr, YTypeStr }
