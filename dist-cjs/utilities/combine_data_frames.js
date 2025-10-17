"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineDataFrames = combineDataFrames;
const data_frame_js_1 = require("../data_frame.js");
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
    return new data_frame_js_1.DataFrame(combinedRecords, {
        include: [...transformedColumns, ...remainingColumns],
    });
}
