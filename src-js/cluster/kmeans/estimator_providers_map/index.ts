import { type IKMeansBaseParameters } from '../parameters.js'
import { type PredictorProvider } from '../../../estimator.js'
import KMeansF32I32Provider from './kmeans_f32_i32_provider.js'
import KMeansF32I64Provider from './kmeans_f32_i64_provider.js'
import KMeansF64I32Provider from './kmeans_f64_i32_provider.js'
import KMeansF64I64Provider from './kmeans_f64_i64_provider.js'
import KMeansU32I32Provider from './kmeans_u32_i32_provider.js'
import KMeansU32I64Provider from './kmeans_u32_i64_provider.js'
import KMeansI32I32Provider from './kmeans_i32_i32_provider.js'
import KMeansI32I64Provider from './kmeans_i32_i64_provider.js'
import KMeansU64I32Provider from './kmeans_u64_i32_provider.js'
import KMeansU64I64Provider from './kmeans_u64_i64_provider.js'
import KMeansI64I32Provider from './kmeans_i64_i32_provider.js'
import KMeansI64I64Provider from './kmeans_i64_i64_provider.js'
import type { NumberTypeRs } from '../parameters.js'

type PredictOutputType = 'i32' | 'i64'

const F32PredictorProvidersMap: Map<PredictOutputType, PredictorProvider<IKMeansBaseParameters, any, any>> = new Map()
F32PredictorProvidersMap.set('i32', new KMeansF32I32Provider())
F32PredictorProvidersMap.set('i64', new KMeansF32I64Provider())

const F64PredictorProvidersMap: Map<PredictOutputType, PredictorProvider<IKMeansBaseParameters, any, any>> = new Map()
F64PredictorProvidersMap.set('i32', new KMeansF64I32Provider())
F64PredictorProvidersMap.set('i64', new KMeansF64I64Provider())

const U32PredictorProvidersMap: Map<PredictOutputType, PredictorProvider<IKMeansBaseParameters, any, any>> = new Map()
U32PredictorProvidersMap.set('i32', new KMeansU32I32Provider())
U32PredictorProvidersMap.set('i64', new KMeansU32I64Provider())

const I32PredictorProvidersMap: Map<PredictOutputType, PredictorProvider<IKMeansBaseParameters, any, any>> = new Map()
I32PredictorProvidersMap.set('i32', new KMeansI32I32Provider())
I32PredictorProvidersMap.set('i64', new KMeansI32I64Provider())

const I64PredictorProvidersMap: Map<PredictOutputType, PredictorProvider<IKMeansBaseParameters, any, any>> = new Map()
I64PredictorProvidersMap.set('i32', new KMeansI64I32Provider())
I64PredictorProvidersMap.set('i64', new KMeansI64I64Provider())

const U64PredictorProvidersMap: Map<PredictOutputType, PredictorProvider<IKMeansBaseParameters, any, any>> = new Map()
U64PredictorProvidersMap.set('i32', new KMeansU64I32Provider())
U64PredictorProvidersMap.set('i64', new KMeansU64I64Provider())

const PredictorProvidersMap: Map<
  NumberTypeRs,
  Map<PredictOutputType, PredictorProvider<IKMeansBaseParameters, any, any>>
> = new Map()
PredictorProvidersMap.set('f32', F32PredictorProvidersMap)
PredictorProvidersMap.set('f64', F64PredictorProvidersMap)
PredictorProvidersMap.set('u32', U32PredictorProvidersMap)
PredictorProvidersMap.set('i32', I32PredictorProvidersMap)
PredictorProvidersMap.set('i64', I64PredictorProvidersMap)
PredictorProvidersMap.set('u64', U64PredictorProvidersMap)

export { PredictorProvidersMap, type PredictOutputType }
