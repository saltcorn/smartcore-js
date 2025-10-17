import { DataFrame } from '../data_frame.js';
/**
 * Combines transformed columns with remaining untransformed columns
 */
declare function combineDataFrames(transformed: DataFrame, remaining: DataFrame | null): DataFrame;
export { combineDataFrames };
