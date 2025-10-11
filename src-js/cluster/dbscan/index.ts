import type { YType } from '../../index.js'
import { BasePredictor } from '../../base_predictor.js'
import { type YTypeKey } from '../../base_estimator.js'
import { DenseMatrix } from '../../linalg/index.js'
import {
  estimatorClasses,
  getParametersInstance,
  type FeatureType,
  type EstimatorClass,
  type DistanceType,
  type IDBSCANParameters,
  type FeatureTypeMap,
} from './parameters.js'

interface DBSCANSerializedData<F extends FeatureType, D extends DistanceType<F>> {
  columns: string[] | null
  data: Buffer
  featureType: F
  params: Partial<IDBSCANParameters<F, D>>
  yType: YTypeKey
}

// class DBSCANOld extends BasePredictor<DBSCANRs, DBSCANParametersRs, YType> {
//   public static readonly className = 'DBSCAN'
//   public readonly name: string = DBSCAN.className
//   public readonly config: IDBSCANParameters

//   private estimatorClasses: Record<DistanceKey, EstimatorClass>

//   constructor(params?: IDBSCANParameters) {
//     const config = params || {}
//     super(getParametersInstance(config))
//     this.config = config

//     this.estimatorClasses = estimatorClasses
//   }

//   static defaultDistanceKey(): DistanceKey {
//     return 'EuclidianF32'
//   }

//   get distanceKey(): DistanceKey {
//     return this.config.distance || DBSCAN.defaultDistanceKey()
//   }

//   protected fitEstimator(matrix: DenseMatrix, _y: YType): DBSCANRs {
//     const EstimatorClass = this.estimatorClasses[this.distanceKey!]
//     return EstimatorClass.fit(matrix.asRsMatrix(), this.parameters)
//   }

//   protected getComponentColumnName(index: number): string {
//     return `DBSCAN${index + 1}`
//   }

//   predictMatrix(matrix: DenseMatrix): YType {
//     return this.estimator!.predict(matrix.asRsMatrix())
//   }

//   serialize(): DBSCANSerializedData {
//     this.ensureFitted('serialize')

//     return {
//       columns: this.columns,
//       data: this.estimator!.serialize(),
//       params: this.config,
//       yType: this._yType!,
//     }
//   }

//   static deserialize(data: DBSCANSerializedData): DBSCAN {
//     let instance = new DBSCAN(data.params)
//     const EstimatorClass = instance.estimatorClasses[data.params.distance || DBSCAN.defaultDistanceKey()]
//     if (EstimatorClass === null) {
//       throw new Error(`${this.name}: Unexpected yType value '${data.yType}'`)
//     }
//     instance.estimator = EstimatorClass.deserialize(data.data)
//     instance._isFitted = true
//     instance._yType = data.yType
//     return instance
//   }
// }

class DBSCAN<F extends FeatureType = 'f32', D extends DistanceType<F> = DistanceType<F> & string> extends BasePredictor<
  FeatureTypeMap[F]['distances'][D] extends { estimator: infer E } ? E : never,
  FeatureTypeMap[F]['distances'][D] extends { params: infer P } ? P : never,
  YType
> {
  private featureType: F
  private distanceType: D
  private config: Partial<IDBSCANParameters<F, D>> = {}

  constructor(featureType: F = 'f32' as F, config: Partial<IDBSCANParameters<F, D>>) {
    super(getParametersInstance(featureType, config))
    this.featureType = featureType
    this.distanceType = (config.distance ?? 'euclidian') as D
    this.config = config
  }

  protected fitEstimator(matrix: DenseMatrix, _y: YType): DBSCANRs {
    const EstimatorClass = this.estimatorClasses[this.distanceKey!]
    return EstimatorClass.fit(matrix.asRsMatrix(), this.parameters)
  }

  protected getComponentColumnName(index: number): string {
    return `DBSCAN${index + 1}`
  }

  predictMatrix(matrix: DenseMatrix): YType {
    return this.estimator!.predict(matrix.asRsMatrix())
  }

  serialize(): DBSCANSerializedData<F, D> {
    this.ensureFitted('serialize')

    return {
      featureType: this.featureType,
      columns: this.columns,
      data: this.estimator!.serialize(),
      params: this.config,
      yType: this._yType!,
    }
  }

  //   static deserialize(data: DBSCANSerializedData): DBSCAN {
  //     let instance = new DBSCAN(data.params)
  //     const EstimatorClass = instance.estimatorClasses[data.params.distance || DBSCAN.defaultDistanceKey()]
  //     if (EstimatorClass === null) {
  //       throw new Error(`${this.name}: Unexpected yType value '${data.yType}'`)
  //     }
  //     instance.estimator = EstimatorClass.deserialize(data.data)
  //     instance._isFitted = true
  //     instance._yType = data.yType
  //     return instance
  //   }
}

export { DBSCAN }
