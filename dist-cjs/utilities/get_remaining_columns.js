"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRemainingColumns = getRemainingColumns;
/**
 * Gets columns that were are not selected
 */
function getRemainingColumns(x, selectedColumns) {
    const allColumns = x.columnNames;
    const remainingColumnNames = allColumns.filter((col) => !selectedColumns.includes(col));
    if (remainingColumnNames.length === 0) {
        return null;
    }
    return x.selectColumnsByName(remainingColumnNames);
}
