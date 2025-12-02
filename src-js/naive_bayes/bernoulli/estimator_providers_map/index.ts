import { type PredictorProvider } from '../../../estimator.js'
import BernoulliNBF32U64Provider from './bernoulli_f32_u64_provider.js'
import BernoulliNBF32U32Provider from './bernoulli_f32_u32_provider.js'
import BernoulliNBF64U32Provider from './bernoulli_f64_u32_provider.js'
import BernoulliNBF64U64Provider from './bernoulli_f64_u64_provider.js'
import BernoulliNBI64U32Provider from './bernoulli_i64_u32_provider.js'
import BernoulliNBI64U64Provider from './bernoulli_i64_u64_provider.js'
import BernoulliNBU64U32Provider from './bernoulli_u64_u32_provider.js'
import BernoulliNBU64U64Provider from './bernoulli_u64_u64_provider.js'
import BernoulliNBI32U32Provider from './bernoulli_i32_u32_provider.js'
import BernoulliNBI32U64Provider from './bernoulli_i32_u64_provider.js'
import BernoulliNBU32U32Provider from './bernoulli_u32_u32_provider.js'
import BernoulliNBU32U64Provider from './bernoulli_u32_u64_provider.js'
import BernoulliNBU16U32Provider from './bernoulli_u16_u32_provider.js'
import BernoulliNBU16U64Provider from './bernoulli_u16_u64_provider.js'
import BernoulliNBU8U32Provider from './bernoulli_u8_u32_provider.js'
import BernoulliNBU8U64Provider from './bernoulli_u8_u64_provider.js'

type XTypeStr = 'f32' | 'f64' | 'i64' | 'u64' | 'i32' | 'u32' | 'u16' | 'u8'
type YTypeStr = 'u32' | 'u64'

const F32EstimatorProvidersMap: Map<YTypeStr, PredictorProvider<IBernoulliNBBaseParameters, any, any>> = new Map()
F32EstimatorProvidersMap.set('u32', new BernoulliNBF32U32Provider())
F32EstimatorProvidersMap.set('u64', new BernoulliNBF32U64Provider())

const F64EstimatorProvidersMap: Map<YTypeStr, PredictorProvider<IBernoulliNBBaseParameters, any, any>> = new Map()
F64EstimatorProvidersMap.set('u32', new BernoulliNBF64U32Provider())
F64EstimatorProvidersMap.set('u64', new BernoulliNBF64U64Provider())

const I64EstimatorProvidersMap: Map<YTypeStr, PredictorProvider<IBernoulliNBBaseParameters, any, any>> = new Map()
I64EstimatorProvidersMap.set('u32', new BernoulliNBI64U32Provider())
I64EstimatorProvidersMap.set('u64', new BernoulliNBI64U64Provider())

const U64EstimatorProvidersMap: Map<YTypeStr, PredictorProvider<IBernoulliNBBaseParameters, any, any>> = new Map()
U64EstimatorProvidersMap.set('u32', new BernoulliNBU64U32Provider())
U64EstimatorProvidersMap.set('u64', new BernoulliNBU64U64Provider())

const I32EstimatorProvidersMap: Map<YTypeStr, PredictorProvider<IBernoulliNBBaseParameters, any, any>> = new Map()
I32EstimatorProvidersMap.set('u32', new BernoulliNBI32U32Provider())
I32EstimatorProvidersMap.set('u64', new BernoulliNBI32U64Provider())

const U32EstimatorProvidersMap: Map<YTypeStr, PredictorProvider<IBernoulliNBBaseParameters, any, any>> = new Map()
U32EstimatorProvidersMap.set('u32', new BernoulliNBU32U32Provider())
U32EstimatorProvidersMap.set('u64', new BernoulliNBU32U64Provider())

const U16EstimatorProvidersMap: Map<YTypeStr, PredictorProvider<IBernoulliNBBaseParameters, any, any>> = new Map()
U16EstimatorProvidersMap.set('u32', new BernoulliNBU16U32Provider())
U16EstimatorProvidersMap.set('u64', new BernoulliNBU16U64Provider())

const U8EstimatorProvidersMap: Map<YTypeStr, PredictorProvider<IBernoulliNBBaseParameters, any, any>> = new Map()
U8EstimatorProvidersMap.set('u32', new BernoulliNBU8U32Provider())
U8EstimatorProvidersMap.set('u64', new BernoulliNBU8U64Provider())

const EstimatorProvidersMap: Map<
  XTypeStr,
  Map<YTypeStr, PredictorProvider<IBernoulliNBBaseParameters, any, any>>
> = new Map()
EstimatorProvidersMap.set('f32', F32EstimatorProvidersMap)
EstimatorProvidersMap.set('f64', F64EstimatorProvidersMap)
EstimatorProvidersMap.set('i64', I64EstimatorProvidersMap)
EstimatorProvidersMap.set('u64', U64EstimatorProvidersMap)
EstimatorProvidersMap.set('i32', I32EstimatorProvidersMap)
EstimatorProvidersMap.set('u32', U32EstimatorProvidersMap)
EstimatorProvidersMap.set('u16', U16EstimatorProvidersMap)
EstimatorProvidersMap.set('u8', U8EstimatorProvidersMap)

interface IBernoulliNBParametersRs {
  withPriors(priors: Float64Array): void
  withAlpha(alpha: number): void
}

interface IBernoulliNBBaseParameters {
  priors?: Float64Array
  alpha?: number
  binarize?: number | bigint
}

interface IBernoulliNBParametersRsBinarizeBigInt extends IBernoulliNBParametersRs {
  withBinarize(binarize: bigint): void
}

interface IBernoulliNBParametersRsBinarizeNumber extends IBernoulliNBParametersRs {
  withBinarize(binarize: number): void
}

function setBernoulliNBParametersValues(parameters: IBernoulliNBParametersRs, config: IBernoulliNBBaseParameters) {
  if (config.alpha !== undefined) {
    parameters.withAlpha(config.alpha)
  }
  if (config.priors !== undefined) {
    parameters.withPriors(config.priors)
  }
  if (config.binarize !== undefined) {
    if (typeof config.binarize === 'bigint')
      (parameters as IBernoulliNBParametersRsBinarizeBigInt).withBinarize(config.binarize)
    else (parameters as IBernoulliNBParametersRsBinarizeNumber).withBinarize(config.binarize)
  }
}

export { EstimatorProvidersMap, setBernoulliNBParametersValues }
export type { YTypeStr, XTypeStr, IBernoulliNBBaseParameters }
