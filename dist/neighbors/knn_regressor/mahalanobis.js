import { KNNRegressorF64EuclidianF64Parameters, KNNRegressorF64MahalanobisF64Parameters, KNNRegressorF64BigI64MahalanobisF64, KNNRegressorF64BigU64MahalanobisF64, KNNRegressorF64I64MahalanobisF64, MahalanobisF64, KNNRegressorF64F64MahalanobisF64, } from '../../../core-bindings/index.js';
import { GenericKNNRegressor } from './generic.js';
import {} from './index.js';
import { DenseMatrix } from '../../index.js';
class KNNRegressorMahalanobis {
    constructor(params) {
        if (!params?.data) {
            throw new Error("Mahalanobis requires 'data' to be defined!");
        }
        let data = params.data instanceof DenseMatrix ? params.data : new DenseMatrix(params.data);
        const p = new KNNRegressorF64EuclidianF64Parameters().withDistanceMahalanobisF64(new MahalanobisF64(data.asF64()));
        if (params?.k)
            p.withK(params.k);
        if (params?.algorithm)
            p.withAlgorithm(params.algorithm);
        if (params?.weight)
            p.withWeight(params.weight);
        this.regressor = new GenericKNNRegressor(p, {
            bigI64: KNNRegressorF64BigI64MahalanobisF64,
            bigU64: KNNRegressorF64BigU64MahalanobisF64,
            i64: KNNRegressorF64I64MahalanobisF64,
            f64: KNNRegressorF64F64MahalanobisF64,
        });
    }
    fit(x, y) {
        return (this.regressor.fit(x, y), this);
    }
    predict(x) {
        return this.regressor.predict(x);
    }
    serialize() {
        return this.regressor.serialize();
    }
    deserialize(data, key) {
        this.deserialize(data, key);
    }
}
export { KNNRegressorMahalanobis };
