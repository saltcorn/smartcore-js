type DataValue = number | bigint;
type DataRecord = Record<string, DataValue>;
interface DataFrameOptions {
    include?: string[];
    exclude?: string[];
}
declare class DataFrame {
    private readonly _columnNames;
    private readonly _data;
    constructor(data: DataRecord[], options?: DataFrameOptions);
    /**
     * Validates that all records have values for all selected columns
     */
    private validateData;
    /**
     * Returns a copy of column names
     */
    get columnNames(): string[];
    /**
     * Returns the number of columns
     */
    get columnsCount(): number;
    /**
     * Returns the number of rows
     */
    get rowsCount(): number;
    /**
     * Returns the shape of the DataFrame as [rows, columns]
     */
    get shape(): [number, number];
    /**
     * Gets a column by its index
     * @param {number} idx - The index of the target column
     */
    getColumn(idx: number): DataValue[];
    /**
     * Gets a column by its name
     * @param {string} columnName - The name of the target column
     */
    getColumnByName(columnName: string): DataValue[];
    /**
     * Returns all columns as a 2D array (row-major order)
     */
    getRows(): DataValue[][];
    /**
     * Returns all columns as a 2D array (column-major order)
     */
    getColumns(): DataValue[][];
    /**
     * Returns numeric columns only as number[][]
     */
    getNumericColumns(): number[][];
    /**
     * Returns bigint columns only as bigint[][]
     */
    getBigIntColumns(): bigint[][];
    /**
     * Returns a row by its index
     * @param {number} idx - Index of the target row
     */
    getRow(idx: number): DataRecord;
    /**
     * Selects columns by their indices
     * @param {number[]} indices - An Array containing the indices of the target columns
     */
    selectColumns(indices: number[]): DataFrame;
    /**
     * Selects columns by their names
     * @param names - An Array containing the names of the target columns
     */
    selectColumnsByName(names: string[]): DataFrame;
    /**
     * Filter rows based on a predicate function
     * @param {function(record: DataRecord, index: number): boolean} predicate - Predicate function
     */
    filter(predicate: (record: DataRecord, index: number) => boolean): DataFrame;
    /**
     * Maps each row to a new value using a transform function
     * @param {function(record: DataRecord, index: number): T} transform Transform function
     * @returns {T[]} Transformed data
     */
    map<T>(transform: (record: DataRecord, index: number) => T): T[];
    /**
     * Returns column statistics (min, max, mean, sum) for numeric columns
     * @param {string} columnName Name of the target column
     */
    describe(columnName: string): {
        min: number;
        max: number;
        mean: number;
        sum: number;
        count: number;
    };
    /**
     * @returns {DataRecord[]} - A plain JavaScript object representation
     */
    toJSON(): DataRecord[];
    /**
     * @returns {DataFrame} - A deep copy of the DataFrame
     */
    clone(): DataFrame;
}
export { DataFrame, type DataValue, type DataRecord, type DataFrameOptions };
