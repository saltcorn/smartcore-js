import { type PredictorProvider } from '../../../estimator.js'
import MultinomialNBU8U8Provider from './multinomial_u8_u8_provider.js'
import MultinomialNBU16U8Provider from './multinomial_u16_u8_provider.js'
import MultinomialNBU16U16Provider from './multinomial_u16_u16_provider.js'
import MultinomialNBU32U8Provider from './multinomial_u32_u8_provider.js'
import MultinomialNBU32U16Provider from './multinomial_u32_u16_provider.js'
import MultinomialNBU32U32Provider from './multinomial_u32_u32_provider.js'
import MultinomialNBU64U8Provider from './multinomial_u64_u8_provider.js'
import MultinomialNBU64U16Provider from './multinomial_u64_u16_provider.js'
import MultinomialNBU64U32Provider from './multinomial_u64_u32_provider.js'
import MultinomialNBU64U64Provider from './multinomial_u64_u64_provider.js'

type XTypeStr = 'u64' | 'u32' | 'u16' | 'u8'
type YTypeStr = 'u64' | 'u32' | 'u16' | 'u8'

const U64EstimatorProvidersMap: Map<YTypeStr, PredictorProvider<IMultinomialNBBaseParameters, any, any>> = new Map()
U64EstimatorProvidersMap.set('u64', new MultinomialNBU64U64Provider())
U64EstimatorProvidersMap.set('u32', new MultinomialNBU64U32Provider())
U64EstimatorProvidersMap.set('u16', new MultinomialNBU64U16Provider())
U64EstimatorProvidersMap.set('u8', new MultinomialNBU64U8Provider())

const U32EstimatorProvidersMap: Map<YTypeStr, PredictorProvider<IMultinomialNBBaseParameters, any, any>> = new Map()
U32EstimatorProvidersMap.set('u32', new MultinomialNBU32U32Provider())
U32EstimatorProvidersMap.set('u16', new MultinomialNBU32U16Provider())
U32EstimatorProvidersMap.set('u8', new MultinomialNBU32U8Provider())

const U16EstimatorProvidersMap: Map<YTypeStr, PredictorProvider<IMultinomialNBBaseParameters, any, any>> = new Map()
U16EstimatorProvidersMap.set('u16', new MultinomialNBU16U16Provider())
U16EstimatorProvidersMap.set('u8', new MultinomialNBU16U8Provider())

const U8EstimatorProvidersMap: Map<YTypeStr, PredictorProvider<IMultinomialNBBaseParameters, any, any>> = new Map()
U8EstimatorProvidersMap.set('u8', new MultinomialNBU8U8Provider())

const EstimatorProvidersMap: Map<
  XTypeStr,
  Map<YTypeStr, PredictorProvider<IMultinomialNBBaseParameters, any, any>>
> = new Map()
EstimatorProvidersMap.set('u64', U64EstimatorProvidersMap)
EstimatorProvidersMap.set('u32', U32EstimatorProvidersMap)
EstimatorProvidersMap.set('u16', U16EstimatorProvidersMap)
EstimatorProvidersMap.set('u8', U8EstimatorProvidersMap)

interface IMultinomialNBParametersRs {
  withPriors(priors: Float64Array): void
  withAlpha(alpha: number): void
}

interface IMultinomialNBBaseParameters {
  priors?: Float64Array
  alpha?: number
  binarize?: number | bigint
}

interface IMultinomialNBParametersRsBinarizeBigInt extends IMultinomialNBParametersRs {
  withBinarize(binarize: bigint): void
}

interface IMultinomialNBParametersRsBinarizeNumber extends IMultinomialNBParametersRs {
  withBinarize(binarize: number): void
}

function setMultinomialNBParametersValues(
  parameters: IMultinomialNBParametersRs,
  config: IMultinomialNBBaseParameters,
) {
  if (config.alpha !== undefined) {
    parameters.withAlpha(config.alpha)
  }
  if (config.priors !== undefined) {
    parameters.withPriors(config.priors)
  }
  if (config.binarize !== undefined) {
    if (typeof config.binarize === 'bigint')
      (parameters as IMultinomialNBParametersRsBinarizeBigInt).withBinarize(config.binarize)
    else (parameters as IMultinomialNBParametersRsBinarizeNumber).withBinarize(config.binarize)
  }
}

export { EstimatorProvidersMap, setMultinomialNBParametersValues }
export type { YTypeStr, XTypeStr, IMultinomialNBBaseParameters }
