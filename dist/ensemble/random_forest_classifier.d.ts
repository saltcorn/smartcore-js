import { RandomForestClassifierF64I64, RandomForestClassifierParameters } from '../../core-bindings/index.js';
import { DenseMatrix } from '../linalg/index.js';
declare class RandomForestClassifier {
    inner: RandomForestClassifierF64I64;
    constructor(inner: RandomForestClassifierF64I64);
    static fit(x: DenseMatrix | number[][], y: number[], parameters: RandomForestClassifierParameters | null): RandomForestClassifier;
    predict(x: DenseMatrix | number[][]): RandomForestClassifier;
    serialize(): Buffer<ArrayBufferLike>;
    static deserialize(data: Buffer): RandomForestClassifier;
}
export { RandomForestClassifier, RandomForestClassifierParameters };
