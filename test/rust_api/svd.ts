import { SVDBuilder, SVD } from '../../dist/core-bindings/index.js'
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
    const _ = new SVDBuilder(x).build()
  })

  it('transform', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const [, xTest, ,] = trainTestSplit(x, y, { testSize: 0.33 })

    const svdBuilder = new SVDBuilder(x)
    const svd = svdBuilder.build()
    const _ = svd.transform(xTest)
  })

  it('serialize + deserialize', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const [, xTest, ,] = trainTestSplit(x, y, { testSize: 0.33 })

    const svdBuilder = new SVDBuilder(x)
    const svd = svdBuilder.build()
    const transformedMatrix1 = svd.transform(xTest)
    const serializedSVD = svd.serialize()
    const deserializedSVD = SVD.deserialize(serializedSVD)
    const transformedMatrix2 = deserializedSVD.transform(xTest)
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
