import { type PredictorProvider } from '../../../estimator.js'
import CategoricalNBU64Provider from './categorical_u64_provider.js'
import CategoricalNBU32Provider from './categorical_u32_provider.js'
import CategoricalNBU16Provider from './categorical_u16_provider.js'
import CategoricalNBU8Provider from './categorical_u8_provider.js'

type XTypeStr = 'u64' | 'u32' | 'u16' | 'u8'
type YType = BigUint64Array | Uint32Array | Uint16Array | Uint8Array

const EstimatorProvidersMap: Map<XTypeStr, PredictorProvider<ICategoricalNBBaseParameters, any, any>> = new Map()
EstimatorProvidersMap.set('u64', new CategoricalNBU64Provider())
EstimatorProvidersMap.set('u32', new CategoricalNBU32Provider())
EstimatorProvidersMap.set('u16', new CategoricalNBU16Provider())
EstimatorProvidersMap.set('u8', new CategoricalNBU8Provider())

interface ICategoricalNBParametersRs {
  withAlpha(alpha: number): void
}

interface ICategoricalNBBaseParameters {
  alpha?: number
}

function setCategoricalNBParametersValues(
  parameters: ICategoricalNBParametersRs,
  config: ICategoricalNBBaseParameters,
) {
  if (config.alpha !== undefined) {
    parameters.withAlpha(config.alpha)
  }
}

export { EstimatorProvidersMap, setCategoricalNBParametersValues }
export type { XTypeStr, ICategoricalNBBaseParameters, YType }
