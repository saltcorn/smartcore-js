import { type NumberTypeRs } from '../../linalg/dense-matrix/index.js'

interface IKMeansBaseParameters {
  maxIter?: bigint | number
  k?: bigint | number
}

interface IKMeansParameters {
  withK(k: bigint): void
  withMaxIter(maxIter: bigint): void
}

function setKMeansParametersValues(parameters: IKMeansParameters, config: IKMeansBaseParameters) {
  if (config.maxIter) {
    const maxIter = typeof config.maxIter === 'number' ? BigInt(config.maxIter) : config.maxIter
    parameters.withMaxIter(maxIter)
  }
  if (config.k) {
    const k = typeof config.k === 'number' ? BigInt(config.k) : config.k
    parameters.withK(k)
  }
}

export type { IKMeansBaseParameters, NumberTypeRs }
export { setKMeansParametersValues }
