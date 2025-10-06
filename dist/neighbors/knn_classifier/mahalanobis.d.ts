import { KNNClassifierF64MahalanobisF64Parameters } from '../../core-bindings/index.js';
import { type IKNNClassifierParameters, type YTypeKey } from './index.js';
import { type XType, type YType } from '../../index.js';
declare class KNNClassifierMahalanobis {
    private classifier;
    constructor(params?: IKNNClassifierParameters);
    fit(x: XType, y: YType): this;
    predict(x: XType): YType;
    serialize(): {
        params: KNNClassifierF64MahalanobisF64Parameters;
        estimatorKey: YTypeKey | null;
        model: any;
    };
    deserialize(data: Buffer, key: YTypeKey): void;
}
export { KNNClassifierMahalanobis };
