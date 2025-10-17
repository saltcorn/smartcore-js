import { DataFrame } from '../data_frame.js';
/**
 * Combines transformed columns with remaining untransformed columns
 */
function combineDataFrames(transformed, remaining) {
    if (remaining === null) {
        return transformed;
    }
    // Ensure the rows in both the transformed and remaining matrices columns are equal
    const transformedRecords = transformed.toJSON();
    const remainingRecords = remaining.toJSON();
    if (transformedRecords.length !== remainingRecords.length) {
        throw new Error(`[combineResults]: Row count mistmatch. Transformed: ${transformedRecords.length}, Remaining: ${remainingRecords.length}`);
    }
    // Merge records
    const combinedRecords = transformedRecords.map((transformedRecord, idx) => ({
        ...transformedRecord,
        ...remainingRecords[idx],
    }));
    const transformedColumns = transformed.columnNames;
    const remainingColumns = remaining.columnNames;
    return new DataFrame(combinedRecords, {
        include: [...transformedColumns, ...remainingColumns],
    });
}
export { combineDataFrames };
