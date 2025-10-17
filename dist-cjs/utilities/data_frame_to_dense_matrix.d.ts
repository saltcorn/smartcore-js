import type { DataFrame } from '../data_frame.js';
import { DenseMatrix } from '../index.js';
/**
 * Converts input to DenseMatrix and tracks DataFrame columns
 */
declare function dataFrameToDenseMatrix(x: DataFrame, columns?: string[]): DenseMatrix;
export { dataFrameToDenseMatrix };
