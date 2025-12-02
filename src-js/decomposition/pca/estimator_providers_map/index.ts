import { type TransformerProvider } from '../../../estimator.js'
import PCAF32Provider from './pca_f32_provider.js'
import PCAF64Provider from './pca_f64_provider.js'
import type { IPCABaseParameters } from '../index.js'
import type { NumberTypeRs } from '../../index.js'

const TransformerProvidersMap: Map<NumberTypeRs, TransformerProvider<IPCABaseParameters, any, any>> = new Map()
TransformerProvidersMap.set('f32', new PCAF32Provider())
TransformerProvidersMap.set('f64', new PCAF64Provider())

interface IPCAParametersRs {
  withNComponents(nComponents: number): void
  useCorrelationMatrix(useCorrelationMatrix: boolean): void
}

function setPCAParametersValues(parameters: IPCAParametersRs, config: IPCABaseParameters) {
  if (config.nComponents !== undefined) {
    parameters.withNComponents(config.nComponents)
  }
  if (config.correlationMatrix !== undefined) {
    parameters.useCorrelationMatrix(config.correlationMatrix)
  }
}

export { TransformerProvidersMap, setPCAParametersValues }
