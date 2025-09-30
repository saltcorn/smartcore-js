import type { Step } from './pipeline.js';
import { Pipeline } from './pipeline.js';
interface Estimator<X, Y, S> {
    fit(x: X, y: Y): S;
}
interface Predictor<X, Y> {
    predict(x: X): Y;
}
interface Transformer<X> {
    transform(x: X): X;
}
interface SerDe<S> {
    serialize(): Buffer;
    deserialize(data: Buffer): S;
}
declare function makePipeline(steps: Step[]): Pipeline;
export type { Estimator, Predictor, Transformer, SerDe };
export { makePipeline };
