import { KNNClassifierF64EuclidianF64Parameters, KNNClassifierF64MinkowskiF64Parameters, KNNClassifierF64BigI64MinkowskiF64, KNNClassifierF64BigU64MinkowskiF64, KNNClassifierF64I64MinkowskiF64, MinkowskiF64, } from '../../../core-bindings/index.js';
import { GenericKNNClassifier } from './generic.js';
import {} from './index.js';
import {} from '../../index.js';
class KNNClassifierMinkowski {
    constructor(params) {
        if (!params?.p) {
            throw new Error("'p' must be provided for Minkowski");
        }
        const p = new KNNClassifierF64EuclidianF64Parameters().withDistanceMinkowskiF64(new MinkowskiF64(params.p));
        if (params?.k)
            p.withK(params.k);
        if (params?.algorithm)
            p.withAlgorithm(params.algorithm);
        if (params?.weight)
            p.withWeight(params.weight);
        this.classifier = new GenericKNNClassifier(p, {
            bigI64: KNNClassifierF64BigI64MinkowskiF64,
            bigU64: KNNClassifierF64BigU64MinkowskiF64,
            i64: KNNClassifierF64I64MinkowskiF64,
        });
    }
    fit(x, y) {
        return (this.classifier.fit(x, y), this);
    }
    predict(x) {
        return this.classifier.predict(x);
    }
    serialize() {
        return this.classifier.serialize();
    }
    deserialize(data, key) {
        this.deserialize(data, key);
    }
}
export { KNNClassifierMinkowski };
