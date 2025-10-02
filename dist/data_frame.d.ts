declare class DataFrame {
    private data;
    private _columnNames;
    constructor(data: Record<string, number | bigint>[], include?: string[], exclude?: string[]);
    static excludeEntries(entries: [string, number | bigint][], exclude?: string[]): [string, number | bigint][];
    get columnNames(): string[];
    get columnsCount(): number;
    get rowsCount(): number;
    getColumn(idx: number): (number | bigint)[];
    getColumnByName(columnName: string): (number | bigint)[];
    getColumns(): number[][];
    getColumnsBig(): bigint[][];
    selectColumns(indices: number[]): DataFrame;
    selectColumnsByName(names: string[]): DataFrame;
}
export { DataFrame };
