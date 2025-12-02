import { type TransformerProvider } from '../../../estimator.js'
import OneHotEncoderF32Provider from './one_hot_encoder_f32_provider.js'
import OneHotEncoderF64Provider from './one_hot_encoder_f64_provider.js'
import type { NumberTypeRs, IOneHotEncoderBaseParameters } from '../index.js'

const TransformerProvidersMap: Map<
  NumberTypeRs,
  TransformerProvider<IOneHotEncoderBaseParameters, any, any>
> = new Map()
TransformerProvidersMap.set('f32', new OneHotEncoderF32Provider())
TransformerProvidersMap.set('f64', new OneHotEncoderF64Provider())

function normalizeCategoricalParams(
  categoricalParams: number[] | bigint[] | BigUint64Array | Uint32Array,
): BigUint64Array {
  if (categoricalParams instanceof BigUint64Array) {
    return categoricalParams
  } else if (categoricalParams instanceof Uint32Array) {
    return BigUint64Array.from(categoricalParams)
  } else if (Array.isArray(categoricalParams)) {
    let params = categoricalParams.map((v) => {
      if (!Number.isInteger(v) || v < 0) {
        throw new Error(`Expected 'categoricalParams' to be an array of unsigned integers.`)
      }
      return BigInt(v)
    })
    return new BigUint64Array(params)
  } else {
    throw new Error(`Expected 'categoricalParams' to be an array of numeric values`)
  }
}

export { TransformerProvidersMap, normalizeCategoricalParams }
