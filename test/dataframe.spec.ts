import { dataFrame } from '../dist/index.js'
import fs from 'fs'
import { dirname, join } from 'path'
import assert from 'assert'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const { DataFrame } = dataFrame
type NestedObject = dataFrame.NestedObject
type DataValue = dataFrame.DataValue

const data_str = fs.readFileSync(join(__dirname, 'e-commerce.json'), 'utf-8')
const dataRaw: {
  product_views: number
  session_duration_minutes: number
  metrics: {
    revenue: number
    items_purchased: number
    purchases: number
  }
}[] = JSON.parse(data_str)
const data: NestedObject[] = dataRaw.map((record) => ({
  product_views: record.product_views,
  session_duration_minutes: record.session_duration_minutes,
  metrics: {
    revenue: record.metrics.revenue,
    items_purchased: record.metrics.items_purchased,
    purchases: record.metrics.purchases,
  },
}))
const df = new DataFrame(data)

describe('DataFrame', () => {
  it('Access nested columns directly', () => {
    const column = df.getColumnByName('metrics.revenue')
    const columnValues = data.map((record) =>
      record.metrics instanceof Object && !Array.isArray(record.metrics) ? record.metrics?.revenue : null,
    )
    assert.deepEqual(column, columnValues)
  })

  it('Select specific nested columns', () => {
    const newDf = df.selectColumnsByName(['product_views', 'metrics.revenue'])
    const columns = newDf.getColumns()

    const columnValues = data.map((record) => ({
      product_views: record.product_views,
      'metrics.revenue':
        record.metrics instanceof Object && !Array.isArray(record.metrics) ? record.metrics?.revenue : null,
    }))
    const refDf = new DataFrame(columnValues, { include: ['product_views', 'metrics.revenue'] })
    const refColumns = refDf.getColumns()

    assert.deepEqual(columns, refColumns)
  })

  it('Get all columns under a prefix', () => {
    const metricsColumns = df.getColumnsByPrefix('metrics')

    const refMap = new Map<string, DataValue[]>()
    data.forEach((record) => {
      if (record.metrics instanceof Object && !Array.isArray(record.metrics)) {
        for (let key in record.metrics) {
          let saveKey = `metrics.${key}`
          let keyVals = refMap.get(saveKey)
          if (!Array.isArray(keyVals)) {
            refMap.set(saveKey, [record.metrics[key] as DataValue])
          } else {
            refMap.set(saveKey, [...keyVals, record.metrics[key] as DataValue])
          }
        }
      }
    })

    assert.deepEqual(metricsColumns, refMap)
  })

  it('Select all columns under a prefix', () => {
    const metricsDf = df.selectColumnsByPrefix('metrics')
    const columns = metricsDf.getColumns()

    const columnValues = data.map((record) => ({
      metrics: record.metrics,
    }))
    const refDf = new DataFrame(columnValues)
    const refColumns = refDf.getColumns()

    assert.deepEqual(columns, refColumns)
  })
})
