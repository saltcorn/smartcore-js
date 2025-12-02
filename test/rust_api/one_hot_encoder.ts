import assert from 'assert'
import { coreBindings, dataset, modelSelection } from '../../src-js/index.js'

const { OneHotEncoderBuilder } = coreBindings
const { loadDigits } = dataset
const { trainTestSplit } = modelSelection

const isARM = process.arch === 'arm' || process.arch === 'arm64'
const TIMEOUT = isARM ? 20000 : 10000

export default () => {
  it('create', () => {
    const digitsData = loadDigits({ returnXY: true })
    const [x, y] = digitsData instanceof Array ? digitsData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const catIdx = BigUint64Array.from(y, (v) => BigInt(v))
    const _ = new OneHotEncoderBuilder(x, catIdx).build()
  })

  it('transform', function (done) {
    this.timeout(TIMEOUT)
    const digitsData = loadDigits({ returnXY: true })
    const [x, y] = digitsData instanceof Array ? digitsData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    const catIdx = BigUint64Array.from(y, (v) => BigInt(v))
    const [, xTest, ,] = trainTestSplit(x, y, { testSize: 0.33 })

    const oneHotEncoderBuilder = new OneHotEncoderBuilder(x, catIdx)
    const oneHotEncoder = oneHotEncoderBuilder.build()
    const _ = oneHotEncoder.transform(xTest)
    done()
  })
}
