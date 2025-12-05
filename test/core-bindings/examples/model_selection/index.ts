import trainTestSplit from './train_test_split.ts'
// import cross_validate from './cross_validate.ts'
import modelPersistence from './model_persistence.ts'
import metrics from './metrics.ts'

export default () => {
  describe('Model Selection and Evaluation', () => {
    trainTestSplit()
    // cross_validate()
    modelPersistence()
    metrics()
  })
}
