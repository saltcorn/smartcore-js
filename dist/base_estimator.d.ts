import { DenseMatrix, type InputType, type YType } from './index.js';
import { DataFrame } from './data_frame.js';
import type { Estimator } from './pipeline/index.js';
type YTypeKey = 'bigI64' | 'bigU64' | 'i64' | 'f64';
/**
 * Abstract base class for estimators
 */
declare abstract class BaseEstimator<TEstimator, TParams> implements Estimator<InputType, YType, any> {
    protected parameters: TParams;
    protected estimator: TEstimator | null;
    protected columns: string[] | null;
    protected _isFitted: boolean;
    protected _yType: YTypeKey | null;
    abstract readonly name: string;
    constructor(parameters: TParams, selectedColumns?: string[]);
    /**
     * Check if model is fitted
     */
    get isFitted(): boolean;
    /**
     * Converts input to DenseMatrix and tracks DataFrame columns
     */
    protected toMatrix(x: InputType): DenseMatrix;
    /**
     * Validates input data
     */
    protected validateInput(x: InputType): void;
    /**
     * @returns data containing values from only the selected columns
     */
    protected getMatrixWindow(x: InputType): InputType;
    /**
     * A template for the fit method
     */
    fit(x: InputType, y: YType): this;
    /**
     * Records the type of y. Useful when determining the output of methods such as predict
     */
    private setYType;
    /**
     * @param {DenseMatrix} matrix
     */
    protected abstract fitEstimator(matrix: DenseMatrix, y: YType): TEstimator;
    /**
     * Validates that the model is fitted before operations
     */
    protected ensureFitted(methodName: string): void;
    /**
     * Converts DenseMatrix to DataFrame
     */
    protected toDataFrame(matrix: DenseMatrix): DataFrame;
    /**
     * Create a name for a column given its index
     */
    protected abstract getComponentColumnName(index: number): string;
    /**
     * Get column names used during fit
     */
    get fittedColumns(): string[] | null;
    /**
     * @returns An Object containing information that can be used to reinstantiate an identical instance to the serialized one
     */
    abstract serialize(): any;
}
export { BaseEstimator, type YTypeKey };
