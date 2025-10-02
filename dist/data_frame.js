class DataFrame {
    constructor(data, include, exclude) {
        this.data = data;
        if (data.length === 0)
            throw new Error('No data provided.');
        const firstRecord = data[0];
        const entries = DataFrame.excludeEntries(Object.entries(firstRecord), exclude);
        if (Array.isArray(include) && include.length !== 0) {
            this._columnNames = include;
        }
        else {
            this._columnNames = entries.map(([key]) => key);
        }
    }
    static excludeEntries(entries, exclude) {
        if (!Array.isArray(exclude) || exclude.length === 0)
            return entries;
        return entries.filter(([k]) => {
            return !(k in exclude);
        });
    }
    get columnNames() {
        return this._columnNames;
    }
    get columnsCount() {
        return this._columnNames.length;
    }
    get rowsCount() {
        return this.data.length;
    }
    getColumn(idx) {
        let columnName = this._columnNames[idx];
        return this.getColumnByName(columnName);
    }
    getColumnByName(columnName) {
        if (!(columnName in this.columnNames)) {
            throw new Error(`Unknown column name: '${columnName}'.`);
        }
        return this.data.reduce((acc, record) => {
            acc.push(record[columnName]);
            return acc;
        }, []);
    }
    getColumns() {
        return this.data.map((record, idx) => {
            let orderedValues = [];
            for (let name in this._columnNames) {
                let value = record[name];
                if (!value && value != 0) {
                    throw new Error(`Record at index ${idx} does not have a value for the column ${name}`);
                }
                if (typeof value === 'bigint') {
                    throw new Error(`Value of data[${name}] is a Big Integer`);
                }
                orderedValues.push(value);
            }
            return orderedValues;
        });
    }
    getColumnsBig() {
        return this.data.map((record, idx) => {
            let orderedValues = [];
            for (let name in this._columnNames) {
                let value = record[name];
                if (!value && value != 0) {
                    throw new Error(`Record at index ${idx} does not have a value for the column ${name}`);
                }
                if (typeof value !== 'bigint') {
                    throw new Error(`Value of data[${name}] is not a Big Integer`);
                }
                orderedValues.push(value);
            }
            return orderedValues;
        });
    }
    selectColumns(indices) {
        const columnNames = indices.map((idx, idxIdx) => {
            if (idx < 0 || idx >= this._columnNames.length) {
                throw new Error(`Invalid index '${idx}' at pos ${idxIdx}`);
            }
            return this._columnNames[idx];
        });
        return this.selectColumnsByName(columnNames);
    }
    selectColumnsByName(names) {
        const newData = [];
        this.data.forEach((record, idx) => {
            let recordSubset = {};
            for (let name in names) {
                let value = record[name];
                if (!value && value != 0) {
                    throw new Error(`Record at index ${idx} does not have a value for the column ${name}`);
                }
                recordSubset[name] = value;
            }
            newData.push(recordSubset);
        });
        return new DataFrame(newData);
    }
}
export { DataFrame };
