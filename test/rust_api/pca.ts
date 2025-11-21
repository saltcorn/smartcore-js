import { PCABuilder, PCA } from '../../dist/core-bindings/index.js'
import { loadBoston } from '../../dist/dataset/v2.js'
import assert from 'assert'
import { trainTestSplit } from '../../dist/model_selection/index.js'

export default () => {
  it('create', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const _ = new PCABuilder(x).build()
  })

  it('transform', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const [, xTest, ,] = trainTestSplit(x, y, { testSize: 0.33 })

    const dbscanBuilder = new PCABuilder(x)
    const dbscan = dbscanBuilder.build()
    const _ = dbscan.transform(xTest)
  })

  it('serialize + deserialize', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const [, xTest, ,] = trainTestSplit(x, y, { testSize: 0.33 })

    const dbscanBuilder = new PCABuilder(x)
    const dbscan = dbscanBuilder.build()
    const transformedMatrix1 = dbscan.transform(xTest)
    const serializedPCA = dbscan.serialize()
    const deserializedPCA = PCA.deserialize(serializedPCA)
    const transformedMatrix2 = deserializedPCA.transform(xTest)
    const [nrows, ncols] = transformedMatrix1.shape()
    const [nrows2, ncols2] = transformedMatrix2.shape()
    assert.equal(nrows, nrows2)
    assert.equal(ncols, ncols2)
    for (let row = 0n; row < nrows; row++) {
      for (let col = 0n; col < ncols; col++) {
        assert.equal(transformedMatrix1.get([row, col]).field0, transformedMatrix2.get([row, col]).field0)
      }
    }
  })
}
