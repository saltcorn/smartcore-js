import type { DataFrame } from '../data_frame.js';
/**
 * Gets columns that were are not selected
 */
declare function getRemainingColumns(x: DataFrame, selectedColumns: string[]): DataFrame | null;
export { getRemainingColumns };
