import { type TransformerProvider } from '../../../estimator.js';
import type { NumberTypeRs } from '../index.js';
import type { RidgeRegressionSolverName } from '../../../core-bindings/index.js';
declare const EstimatorProvidersMap: Map<NumberTypeRs, Map<NumberTypeRs, TransformerProvider<IRidgeRegressionBaseParameters, any, any>>>;
interface IRidgeRegressionParametersRs {
    withAlpha(alpha: number): void;
    withNormalize(normalize: boolean): void;
    withSolver(solver: RidgeRegressionSolverName): void;
}
interface IRidgeRegressionBaseParameters {
    alpha?: number;
    normalize?: boolean;
    solver?: RidgeRegressionSolverName;
}
declare function setRidgeRegressionParametersValues(parameters: IRidgeRegressionParametersRs, config: IRidgeRegressionBaseParameters): void;
export { EstimatorProvidersMap, setRidgeRegressionParametersValues, type IRidgeRegressionBaseParameters };
