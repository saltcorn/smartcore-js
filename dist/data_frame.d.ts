type PrimitiveValue = number | bigint | string | boolean | null;
type NestedValue = PrimitiveValue | NestedObject | NestedArray;
type NestedObject = {
    [key: string]: NestedValue;
};
type NestedArray = NestedValue[];
type DataValue = number | bigint;
type FlatRecord = Record<string, DataValue>;
interface DataFrameOptions {
    include?: string[];
    exclude?: string[];
}
declare class DataFrame {
    private readonly _columnNames;
    private readonly _data;
    private readonly _separator;
    constructor(data: NestedObject[], options?: DataFrameOptions);
    /**
     * Flattens a nested object into a single-level object with dot notation
     * @param {NestedObject} obj - A nested object
     * @returns {Record<string, PrimitiveValue>} - A flattened object
     */
    private flattenObject;
    /**
     * Gets all unique column names from flattened records
     * @param records
     */
    private getAllColumns;
    private toDataValue;
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
     * Returns all columns matching a prefix
     * @param {string} prefix - A string to use as the prefix
     * @returns {Map<string, DataValue>} Values for all matching columns mapped to the column names
     */
    getColumnsByPrefix(prefix: string): Map<string, DataValue[]>;
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
    getRow(idx: number): FlatRecord;
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
     * Selects all columns matching a prefix pattern
     * @param {string} prefix - Prefix to be used in filter
     */
    selectColumnsByPrefix(prefix: string): DataFrame;
    /**
     * Filter rows based on a predicate function
     * @param {function(record: FlatRecord, index: number): boolean} predicate - Predicate function
     */
    filter(predicate: (record: FlatRecord, index: number) => boolean): DataFrame;
    /**
     * Maps each row to a new value using a transform function
     * @param {function(record: FlatRecord, index: number): T} transform Transform function
     * @returns {T[]} Transformed data
     */
    map<T>(transform: (record: FlatRecord, index: number) => T): T[];
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
        std: number;
    };
    describeAll(): Map<string, ReturnType<typeof this.describe>>;
    /**
     * @returns {FlatRecord[]} - A plain JavaScript object representation
     */
    toJSON(): FlatRecord[];
    /**
     * @returns {DataFrame} - A deep copy of the DataFrame
     */
    clone(): DataFrame;
}
export { DataFrame, type DataValue, type FlatRecord, type NestedObject, type DataFrameOptions };
