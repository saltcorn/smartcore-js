import assert from 'assert'
import { coreBindings, modelSelection, metrics, dataFrame, utilities } from '../../dist/index.js'
import { readJSONFile } from '../helpers.js'

const { MultinomialNBBuilder, MultinomialNB, DenseMatrixType, TypedArrayType } = coreBindings
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
    const _ = new MultinomialNBBuilder(x, y).build()
  })

  it('predict', () => {
    const [, xTest, , yTest] = trainTestSplit(x, Int32Array.from(yPlain), { testSize: 0.33 })

    const multinomialNBBuilder = new MultinomialNBBuilder(x, y)
    const multinomialNB = multinomialNBBuilder.build()
    const score = accuracyScore(multinomialNB.predict(xTest).field0, yTest)
    assert(score >= 0)
  })

  it('serialize + deserialize', () => {
    const [, xTest, , yTest] = trainTestSplit(x, Int32Array.from(yPlain), { testSize: 0.33 })

    const multinomialNBBuilder = new MultinomialNBBuilder(x, y)
    const multinomialNB = multinomialNBBuilder.build()
    const score1 = accuracyScore(multinomialNB.predict(xTest).field0, yTest)
    const serializedMultinomialNB = multinomialNB.serialize()
    const deserializedMultinomialNB = MultinomialNB.deserialize(serializedMultinomialNB)
    const score2 = accuracyScore(deserializedMultinomialNB.predict(xTest).field0, yTest)
    assert.equal(score1, score2)
  })
}
