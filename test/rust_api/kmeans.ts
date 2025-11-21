import { KMeansBuilder, KMeans } from '../../dist/core-bindings/index.js'
import { loadBoston } from '../../dist/dataset/v2.js'
import assert from 'assert'
import { trainTestSplit } from '../../dist/model_selection/index.js'
import { accuracyScore } from '../../dist/metrics/index.js'

export default () => {
  it('create', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const _ = new KMeansBuilder(x).build()
  })

  it('predict', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const kmeansBuilder = new KMeansBuilder(x)
    const kmeans = kmeansBuilder.build()
    const score = accuracyScore(kmeans.predict(xTest).field0, yTest)
    assert(score >= 0)
  })

  it('serialize + deserialize', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const [, xTest, , yTest] = trainTestSplit(x, y, { testSize: 0.33 })

    const kmeansBuilder = new KMeansBuilder(x)
    const kmeans = kmeansBuilder.build()
    const score1 = accuracyScore(kmeans.predict(xTest).field0, yTest)
    const serializedKMeans = kmeans.serialize()
    const deserializedKMeans = KMeans.deserialize(serializedKMeans)
    const score2 = accuracyScore(deserializedKMeans.predict(xTest).field0, yTest)
    assert.equal(score1, score2)
  })
}
