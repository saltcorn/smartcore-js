import { type InputType } from '../../index.js'
import { type KNNAlgorithmName } from '../../core-bindings/index.js'

interface IDBSCANBaseParameters {
  minSamples?: bigint
  algorithm?: KNNAlgorithmName
  eps?: number
  data?: InputType
  p?: number
}

interface IDBSCANParameters {
  withMinSamples(samples: bigint): void
  withAlgorithm(algorithm: KNNAlgorithmName): void
  withEps(eps: number): void
}

function setDBSCANParametersValues(parameters: IDBSCANParameters, config: IDBSCANBaseParameters) {
  if (config.algorithm) {
    parameters.withAlgorithm(config.algorithm)
  }
  if (config.eps) {
    parameters.withEps(config.eps)
  }
  if (config.minSamples) {
    parameters.withMinSamples(config.minSamples)
  }
}

export type { IDBSCANBaseParameters }
export { setDBSCANParametersValues }
