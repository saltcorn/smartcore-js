import { OneHotEncoderBuilder, OneHotEncoder } from '../../dist/core-bindings/index.js'
import { loadIris } from '../../dist/dataset/index.js'
import assert from 'assert'
import { trainTestSplit } from '../../dist/model_selection/index.js'

export default () => {
  it('create', () => {
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const catIdx = BigUint64Array.from(y)
    const _ = new OneHotEncoderBuilder(x, catIdx).build()
  })

  it('transform', () => {
    const irisData = loadIris({ returnXY: true })
    const [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const catIdx = BigUint64Array.from(y)
    const [, xTest, ,] = trainTestSplit(x, y, { testSize: 0.33 })

    const oneHotEncoderBuilder = new OneHotEncoderBuilder(x, catIdx)
    const oneHotEncoder = oneHotEncoderBuilder.build()
    const _ = oneHotEncoder.transform(xTest)
  })
}
