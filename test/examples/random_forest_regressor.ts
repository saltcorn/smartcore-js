import {
  dataset,
  trainTestSplitF32F32,
  RandomForestRegressorF32F32,
  RandomForestRegressorParameters,
  MeanSquareErrorF32,
} from '../../index'
import assert from 'assert'

export default () => {
  it('Random Forest Regressor', () => {
    let bostonData = dataset.boston().loadDataset()
    let x = bostonData.denseMatrix()
    let y = bostonData.target
    let [, xTest, , yTest] = trainTestSplitF32F32(x, y, 0.2, true)
    let yHatRf = RandomForestRegressorF32F32.fit(x, bostonData.target, new RandomForestRegressorParameters()).predict(
      xTest,
    )
    let meanSquareError = new MeanSquareErrorF32()
    let score = meanSquareError.getScore(yTest, yHatRf)
    assert(score)
  })
}
