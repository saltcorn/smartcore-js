import assert from 'assert'
import { coreBindings, dataset, modelSelection } from '../../dist/index.js'

const { StandardScalerBuilder, StandardScaler } = coreBindings
const { loadBoston } = dataset
const { trainTestSplit } = modelSelection

export default () => {
  it('create', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const _ = new StandardScalerBuilder(x).build()
  })

  it('transform', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const [, xTest, ,] = trainTestSplit(x, y, { testSize: 0.33 })

    const standardScalerBuilder = new StandardScalerBuilder(x)
    const standardScaler = standardScalerBuilder.build()
    const _ = standardScaler.transform(xTest)
  })

  it('serialize + deserialize', () => {
    const bostonData = loadBoston({ returnXY: true })
    const [x, y] = bostonData instanceof Array ? bostonData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const [, xTest, ,] = trainTestSplit(x, y, { testSize: 0.33 })

    const standardScalerBuilder = new StandardScalerBuilder(x)
    const standardScaler = standardScalerBuilder.build()
    const transformedMatrix1 = standardScaler.transform(xTest)
    const serializedStandardScaler = standardScaler.serialize()
    const deserializedStandardScaler = StandardScaler.deserialize(serializedStandardScaler)
    const transformedMatrix2 = deserializedStandardScaler.transform(xTest)
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
