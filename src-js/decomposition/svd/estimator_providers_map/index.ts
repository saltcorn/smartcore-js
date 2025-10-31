import { type TransformerProvider } from '../../../estimator.js'
import SVDF32Provider from './svd_f32_provider.js'
import SVDF64Provider from './svd_f64_provider.js'
import type { ISVDBaseParameters } from '../index.js'
import type { NumberTypeRs } from '../../index.js'

const TransformerProvidersMap: Map<NumberTypeRs, TransformerProvider<ISVDBaseParameters, any, any>> = new Map()
TransformerProvidersMap.set('f32', new SVDF32Provider())
TransformerProvidersMap.set('f64', new SVDF64Provider())

interface ISVDParametersRs {
  withNComponents(nComponents: number): void
}

function setSVDParametersValues(parameters: ISVDParametersRs, config: ISVDBaseParameters) {
  if (config.nComponents !== undefined) {
    parameters.withNComponents(config.nComponents)
  }
}

export { TransformerProvidersMap, setSVDParametersValues }
