import {
  dataset,
  trainTestSplitF64F64,
  RandomForestRegressorF64F64,
  RandomForestRegressorParameters,
  MeanSquareErrorF64,
} from '../../../index.js'
import assert from 'assert'

export default () => {
  it('Random Forest Regressor', () => {
    let bostonData = dataset.boston().loadDataset()
    let x = bostonData.denseMatrix()
    let y = bostonData.target
    let [, xTest, , yTest] = trainTestSplitF64F64(x, y, 0.2, true)
    let yHatRf = RandomForestRegressorF64F64.fit(x, bostonData.target, new RandomForestRegressorParameters()).predict(
      xTest,
    )
    let meanSquareError = new MeanSquareErrorF64()
    let score = meanSquareError.getScore(yTest, yHatRf)
    assert(score)
  })
}
