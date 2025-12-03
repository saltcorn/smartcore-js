import assert from 'assert'
import { coreBindings, modelSelection, metrics, dataFrame, utilities } from '../../src-js/index.js'
import { readJSONFile } from '../helpers.js'

const { CategoricalNBBuilder, CategoricalNB, DenseMatrixType, TypedArrayType } = coreBindings
const { trainTestSplit } = modelSelection
const { accuracyScore } = metrics
const { DataFrame } = dataFrame

const parsedJson = readJSONFile('e-commerce-enhanced.json')

export default () => {
  const df = new DataFrame(parsedJson, {
    include: [
      'product_views',
      'cart_additions',
      'cart_removals',
      'wishlist_additions',
      'search_queries',
      'page_scrolls',
      'click_count',
      'discount_used',
      'customer_age',
      'previous_purchases',
      'days_since_last_purchase',
      'email_opens_last_month',
      'reviews_written',
      'metrics.items_purchased',
      'metrics.purchases',
    ],
  })
  const x = utilities.dataFrameToDenseMatrix(df, { numberType: DenseMatrixType.U32 })
  const yPlain = [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1]
  const y = utilities.wrapTypedArray(utilities.arrayToTypedArray(yPlain, { numberType: TypedArrayType.U32 }))

  it('create', () => {
    const _ = new CategoricalNBBuilder(x, y).build()
  })

  it('predict', () => {
    const [, xTest, , yTest] = trainTestSplit(x, Int32Array.from(yPlain), { testSize: 0.33 })

    const bernoulliNBBuilder = new CategoricalNBBuilder(x, y)
    const bernoulliNB = bernoulliNBBuilder.build()
    const score = accuracyScore(bernoulliNB.predict(xTest).field0, yTest, false)
    assert(score >= 0)
  })

  it('serialize + deserialize', () => {
    const [, xTest, , yTest] = trainTestSplit(x, Int32Array.from(yPlain), { testSize: 0.33 })

    const bernoulliNBBuilder = new CategoricalNBBuilder(x, y)
    const bernoulliNB = bernoulliNBBuilder.build()
    const score1 = accuracyScore(bernoulliNB.predict(xTest).field0, yTest, false)
    const serializedCategoricalNB = bernoulliNB.serialize()
    const deserializedCategoricalNB = CategoricalNB.deserialize(serializedCategoricalNB)
    const score2 = accuracyScore(deserializedCategoricalNB.predict(xTest).field0, yTest, false)
    assert.equal(score1, score2)
  })
}
