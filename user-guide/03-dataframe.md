# DataFrame Guide

SmartCore-JS includes a powerful DataFrame class for handling structured data, similar to pandas DataFrames in Python.

## Table of Contents

- [Introduction](#introduction)
- [Creating DataFrames](#creating-dataframes)
- [Accessing Data](#accessing-data)
- [Data Manipulation](#data-manipulation)
- [Working with ML Models](#working-with-ml-models)
- [Advanced Features](#advanced-features)

## Introduction

The DataFrame class provides a flexible way to work with structured data in SmartCore-JS. It's particularly useful when:

- Working with JSON data
- Handling mixed data types
- Need named columns
- Working with nested objects
- Building data pipelines

## Creating DataFrames

### From Array of Objects

The most common way to create a DataFrame:

```typescript
import { dataFrame } from '@saltcorn/smartcore-js'

const df = new dataFrame.DataFrame([
  { name: 'Alice', age: 25, score: 85.5 },
  { name: 'Bob', age: 30, score: 92.3 },
  { name: 'Charlie', age: 35, score: 78.9 },
])

console.log(df.shape) // [3, 3] - 3 rows, 3 columns
```

### From Nested Objects

DataFrame automatically flattens nested structures:

```typescript
const data = [
  {
    user: { id: 1, name: 'Alice' },
    metrics: { score: 85, attempts: 3 },
  },
  {
    user: { id: 2, name: 'Bob' },
    metrics: { score: 92, attempts: 2 },
  },
]

const df = new dataFrame.DataFrame(data)

console.log(df.columnNames)
// ['user.id', 'user.name', 'metrics.score', 'metrics.attempts']
```

### With Column Selection

Include or exclude specific columns:

```typescript
// Include only specific columns
const df1 = new dataFrame.DataFrame(data, {
  include: ['name', 'age'],
})

// Exclude specific columns
const df2 = new dataFrame.DataFrame(data, {
  exclude: ['id', 'timestamp'],
})
```

### From JSON File

```typescript
import fs from 'fs'
import { dataFrame } from '@saltcorn/smartcore-js'

const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf-8'))
const df = new dataFrame.DataFrame(jsonData)
```

## Accessing Data

### Basic Properties

```typescript
// Get shape (rows, columns)
console.log(df.shape) // [100, 5]
console.log(df.rowsCount) // 100
console.log(df.columnsCount) // 5

// Get column names
console.log(df.columnNames) // ['col1', 'col2', 'col3', ...]
```

### Get Columns

```typescript
// By index
const firstCol = df.getColumn(0)

// By name
const ageCol = df.getColumnByName('age')

// Multiple columns by prefix
const userCols = df.getColumnsByPrefix('user.')
// Returns Map: { 'user.id' => [...], 'user.name' => [...] }

// All columns as arrays
const allCols = df.getColumns() // Array of column arrays
```

### Get Rows

```typescript
// Single row by index
const row = df.getRow(0) // Returns object: { name: 'Alice', age: 25, ... }

// All rows
const rows = df.getRows() // Array of arrays
```

### Extract Numeric Data

```typescript
// Get all columns as 2D array of numbers
const numericData = df.getNumericColumns()

// Get bigint columns
const bigintData = df.getBigIntColumns()
```

## Data Manipulation

### Filtering Rows

```typescript
// Filter by predicate
const adults = df.filter((record) => record.age >= 18)

// Filter with index
const first10Adults = df.filter((record, idx) => record.age >= 18 && idx < 10)
```

### Mapping Data

```typescript
// Transform rows
const names = df.map((record) => record.name)
// ['Alice', 'Bob', 'Charlie']

// Create new values
const ageInMonths = df.map((record) => record.age * 12)
```

### Selecting Columns

```typescript
// By indices
const subset1 = df.selectColumns([0, 2, 4])

// By names
const subset2 = df.selectColumnsByName(['name', 'age', 'score'])

// By prefix
const userFields = df.selectColumnsByPrefix('user.')
```

### Statistics

```typescript
// Describe a single column
const ageStats = df.describe('age')
console.log(ageStats)
// {
//   count: 100,
//   mean: 32.5,
//   std: 8.2,
//   min: 18,
//   max: 65,
//   q25: 25,
//   q50: 31,  // median
//   q75: 40
// }

// Describe all numeric columns
const allStats = df.describeAll()
// Map of column name to statistics
```

### Converting to JSON

```typescript
// Get original array of objects
const jsonData = df.toJSON()

// Save to file
import fs from 'fs'
fs.writeFileSync('output.json', JSON.stringify(jsonData, null, 2))
```

### Cloning

```typescript
// Create a copy
const dfCopy = df.clone()

// Modifications to copy don't affect original
const filtered = dfCopy.filter((r) => r.age > 25)
```

## Working with ML Models

### DataFrame as Input

Most SmartCore-JS algorithms accept DataFrames directly:

```typescript
import { linearModel, dataFrame } from '@saltcorn/smartcore-js'

const df = new dataFrame.DataFrame(trainingData)
const y = new Float64Array([0, 1, 0, 1, 1, 0]) // targets

const model = new linearModel.LogisticRegression()
model.fit(df, y)

const predictions = model.predict(df)
```

### Column Selection for Models

Specify which columns to use:

```typescript
import { preprocessing } from '@saltcorn/smartcore-js'

// Use only specific columns
const scaler = new preprocessing.StandardScaler({
  columns: ['age', 'income', 'score'],
})

scaler.fit(df)
const scaled = scaler.transform(df) // Only specified columns are scaled
```

### Transformations with DataFrames

```typescript
import { preprocessing, dataFrame } from '@saltcorn/smartcore-js'

const df = new dataFrame.DataFrame(data)

// Scale numeric features
const scaler = new preprocessing.StandardScaler({
  columns: ['age', 'income'], // Only scale these columns
})
scaler.fit(df)
const scaledDf = scaler.transform(df) // Returns DataFrame with scaled columns
```

### Working with Categorical Features

```typescript
// Prepare categorical data
const df = new dataFrame.DataFrame([
  { color: 'red', size: 'L', price: 29.99 },
  { color: 'blue', size: 'M', price: 24.99 },
  { color: 'green', size: 'S', price: 19.99 },
])

// OneHotEncoder works with categorical columns
const encoder = new preprocessing.OneHotEncoder({
  catIdx: new BigUint64Array([0, 1]), // color and size columns
})
encoder.fit(df)
const encoded = encoder.transform(df)
```

## Advanced Features

### Nested Object Handling

DataFrame automatically flattens nested objects with dot notation:

```typescript
const data = [
  {
    customer: {
      id: 1,
      profile: {
        name: 'Alice',
        age: 25,
      },
    },
    purchase: {
      amount: 99.99,
      date: '2024-01-01',
    },
  },
]

const df = new dataFrame.DataFrame(data)

console.log(df.columnNames)
// [
//   'customer.id',
//   'customer.profile.name',
//   'customer.profile.age',
//   'purchase.amount',
//   'purchase.date'
// ]

// Access nested values
const customerIds = df.getColumnByName('customer.id')
const names = df.getColumnByName('customer.profile.name')

// Select all customer fields
const customerDf = df.selectColumnsByPrefix('customer.')
```

### Working with Prefixes

```typescript
// Get all metrics columns
const metricsCols = df.getColumnsByPrefix('metrics.')

// Select multiple prefixes
const features = df.selectColumnsByName([
  ...df.getColumnsByPrefix('user.').keys(),
  ...df.getColumnsByPrefix('metrics.').keys(),
])
```

### Missing Values

```typescript
const data = [
  { name: 'Alice', age: 25, score: 85 },
  { name: 'Bob', age: 30 }, // missing score
  { name: 'Charlie', score: 78 }, // missing age
]

const df = new dataFrame.DataFrame(data)

// Missing values are represented as null or NaN
const ages = df.getColumnByName('age')
console.log(ages) // [25, 30, NaN]
```

### Type Conversion

```typescript
// DataFrame automatically infers types
const data = [
  { id: 1, name: 'Alice', active: true, score: 85.5 },
  { id: 2, name: 'Bob', active: false, score: 92.3 },
]

const df = new dataFrame.DataFrame(data)

// Numbers are preserved
const ids = df.getColumnByName('id') // [1, 2]

// Strings are preserved
const names = df.getColumnByName('name') // ['Alice', 'Bob']

// Booleans are converted to numbers
const active = df.getColumnByName('active') // [1, 0]
```

### Combining with Arrays

```typescript
// Extract numeric data for array-based operations
const numericData = df.getNumericColumns()

// Use with models that expect arrays
model.fit(numericData, y)

// Convert back to DataFrame
const resultDf = new dataFrame.DataFrame(
  numericData.map((row, idx) => ({
    feature1: row[0],
    feature2: row[1],
    prediction: predictions[idx],
  })),
)
```

## Practical Examples

### Example 1: Data Preprocessing Pipeline

```typescript
import { dataFrame, preprocessing, pipeline, linearModel } from '@saltcorn/smartcore-js'

// Load data
const rawData = JSON.parse(fs.readFileSync('customers.json', 'utf-8'))
const df = new dataFrame.DataFrame(rawData, {
  exclude: ['id', 'timestamp', 'email'], // Remove non-feature columns
})

// Create pipeline
const pipe = pipeline.makePipeline([
  new preprocessing.StandardScaler({
    columns: df.columnNames.filter((name) => name.startsWith('metrics.')),
  }),
  new linearModel.LogisticRegression(),
])

// Train
const y = new Float64Array(labels)
pipe.fit(df, y)

// Predict on new data
const newDf = new dataFrame.DataFrame(newCustomers)
const predictions = pipe.predict(newDf)
```

### Example 2: Feature Engineering

```typescript
// Original DataFrame
const df = new dataFrame.DataFrame(userData)

// Create new features by mapping
const enrichedData = df.map((record) => ({
  ...record,
  ageGroup: record.age < 30 ? 'young' : record.age < 50 ? 'middle' : 'senior',
  scoreCategory: record.score >= 90 ? 'A' : record.score >= 80 ? 'B' : 'C',
  isActive: record.lastLogin ? 1 : 0,
}))

const enrichedDf = new dataFrame.DataFrame(enrichedData)
```

### Example 3: Data Analysis

```typescript
// Load data
const df = new dataFrame.DataFrame(salesData)

// Get statistics for all columns
const stats = df.describeAll()

// Print summary
for (const [colName, colStats] of stats) {
  console.log(`\n${colName}:`)
  console.log(`  Mean: ${colStats.mean.toFixed(2)}`)
  console.log(`  Std Dev: ${colStats.std.toFixed(2)}`)
  console.log(`  Range: [${colStats.min}, ${colStats.max}]`)
}

// Filter outliers
const cleanDf = df.filter((record) => {
  const priceStats = stats.get('price')
  const price = record.price
  const zscore = Math.abs((price - priceStats.mean) / priceStats.std)
  return zscore < 3 // Keep values within 3 standard deviations
})
```

### Example 4: Working with Time Series

```typescript
const data = [
  { date: '2024-01-01', value: 100, category: 'A' },
  { date: '2024-01-02', value: 105, category: 'A' },
  { date: '2024-01-03', value: 103, category: 'B' },
]

const df = new dataFrame.DataFrame(data)

// Create time-based features
const enriched = df.map((record, idx) => ({
  ...record,
  dayOfWeek: new Date(record.date).getDay(),
  isWeekend: [0, 6].includes(new Date(record.date).getDay()) ? 1 : 0,
  lag1Value: idx > 0 ? data[idx - 1].value : null,
}))

const enrichedDf = new dataFrame.DataFrame(enriched)
```

## Best Practices

### 1. Column Selection

Always specify which columns to use for models:

```typescript
// ❌ Not recommended - uses all columns
model.fit(df, y)

// ✅ Better - explicit column selection
const features = ['age', 'income', 'score']
const featureDf = df.selectColumnsByName(features)
model.fit(featureDf, y)

// ✅ Best - specify columns in model/transformer
const scaler = new preprocessing.StandardScaler({ columns: features })
```

### 2. Handle Missing Values

```typescript
// Check for missing values
const hasNaN = df.getNumericColumns().some((row) => row.some((val) => isNaN(val)))

if (hasNaN) {
  // Filter out rows with missing values
  const cleanDf = df.filter((record) => {
    return Object.values(record).every((val) => val !== null && !isNaN(Number(val)))
  })
}
```

### 3. Memory Efficiency

```typescript
// ❌ Creates many intermediate DataFrames
let df = new dataFrame.DataFrame(data)
df = df.filter((r) => r.age > 18)
df = df.selectColumnsByName(['age', 'score'])
df = df.filter((r) => r.score > 70)

// ✅ Better - chain operations
const df = new dataFrame.DataFrame(data).filter((r) => r.age > 18 && r.score > 70).selectColumnsByName(['age', 'score'])
```

### 4. Type Safety

```typescript
// Define types for your data
interface UserRecord {
  id: number
  name: string
  age: number
  score: number
}

const data: UserRecord[] = loadData()
const df = new dataFrame.DataFrame(data)

// TypeScript will catch errors
const ages = df.getColumnByName('age') // ✅ OK
const invalid = df.getColumnByName('nonexistent') // ⚠️ Runtime check needed
```

## Performance Tips

1. **Use numeric data for models**: Extract numeric columns when possible
2. **Minimize transformations**: Chain operations to reduce intermediate objects
3. **Specify columns explicitly**: Helps both performance and clarity
4. **Reuse DataFrames**: Don't create new ones unnecessarily
5. **Consider arrays for large datasets**: If you don't need column names, arrays are faster

## Summary

**Key Points:**

- DataFrame handles structured data with named columns
- Automatically flattens nested objects
- Integrates seamlessly with ML models
- Provides data manipulation and analysis tools
- Supports column selection and filtering
- Can convert to/from JSON and arrays

---

**Previous**: [Core Concepts ←](./02-core-concepts.md) | **Next**: [Linear Models →](./04-linear-models.md)
