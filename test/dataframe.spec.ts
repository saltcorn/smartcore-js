import { dataFrame } from '../src-js/index.js'
import assert from 'assert'
import { extractNumericECommerceFields, readJSONFile } from './helpers.js'

const { DataFrame } = dataFrame
type DataValue = dataFrame.DataValue

const parsedJson = readJSONFile('e-commerce.json')
const data = extractNumericECommerceFields(parsedJson)
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
          const saveKey = `metrics.${key}`
          const keyVals = refMap.get(saveKey)
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
