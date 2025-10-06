import { dataFrame } from '../src-js/index.js'
import fs from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const { DataFrame } = dataFrame
type NestedObject = dataFrame.NestedObject

function readJSONFile(filename: string) {
  const data_str = fs.readFileSync(join(__dirname, filename), 'utf-8')
  return JSON.parse(data_str)
}

function extractNumericECommerceFields(parsedJson: any) {
  const dataRaw: {
    product_views: number
    session_duration_minutes: number
    metrics: {
      revenue: number
      items_purchased: number
      purchases: number
    }
  }[] = parsedJson
  const data: NestedObject[] = dataRaw.map((record) => ({
    product_views: record.product_views,
    session_duration_minutes: record.session_duration_minutes,
    metrics: {
      revenue: record.metrics.revenue,
      items_purchased: record.metrics.items_purchased,
      purchases: record.metrics.purchases,
    },
  }))
  return data
}

export { extractNumericECommerceFields, readJSONFile }
