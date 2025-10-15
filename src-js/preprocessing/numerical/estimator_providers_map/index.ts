import { type TransformerProvider } from '../../../estimator.js'
import StandardScalerF32Provider from './standard_scaler_f32_provider.js'
import StandardScalerF64Provider from './standard_scaler_f64_provider.js'
import type { NumberTypeRs, IStandardScalerBaseParameters } from '../index.js'

const TransformerProvidersMap: Map<
  NumberTypeRs,
  TransformerProvider<IStandardScalerBaseParameters, any, any>
> = new Map()
TransformerProvidersMap.set('f32', new StandardScalerF32Provider())
TransformerProvidersMap.set('f64', new StandardScalerF64Provider())

export { TransformerProvidersMap }
