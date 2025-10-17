import { DataFrame } from '../data_frame.js';
import type { DenseMatrix } from '../index.js';
/**
 * Converts DenseMatrix to DataFrame
 */
declare function denseMatrixToDataFrame(matrix: DenseMatrix, columns: string[]): DataFrame;
export { denseMatrixToDataFrame };
