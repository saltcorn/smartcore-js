import { PCAF64 } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
import type { SerDe } from '../pipeline/index.js';
interface PCAParametersVals {
    nComponents?: number;
    useCorrelationMatrix?: boolean;
}
type PCARs = PCAF64;
declare class PCATransformer implements SerDe<PCATransformer> {
    private inner;
    constructor(inner: PCARs);
    transform(x: DenseMatrix | number[][]): DenseMatrix;
    serialize(): Buffer;
    deserialize(data: Buffer): PCATransformer;
}
declare class PCA {
    private parameters;
    constructor(params: PCAParametersVals);
    fit(x: DenseMatrix | number[][], _y: number[]): PCATransformer;
}
export default PCA;
