import { KNNRegressorF64MahalanobisF64Parameters } from '../../core-bindings/index.js';
import { type IKNNRegressorParameters, type YTypeKey } from './index.js';
import { type XType, type YType } from '../../index.js';
declare class KNNRegressorMahalanobis {
    private regressor;
    constructor(params?: IKNNRegressorParameters);
    fit(x: XType, y: YType): this;
    predict(x: XType): YType;
    serialize(): {
        params: KNNRegressorF64MahalanobisF64Parameters;
        estimatorKey: YTypeKey | null;
        model: any;
    };
    deserialize(data: Buffer, key: YTypeKey): void;
}
export { KNNRegressorMahalanobis };
