import train_test_split from './train_test_split.ts'
import cross_validate from './cross_validate.ts'
import model_persistence from './model_persistence.ts'
import metrics from './metrics.ts'

export default () => {
  describe('Model Selection and Evaluation', () => {
    train_test_split()
    cross_validate()
    model_persistence()
    metrics()
  })
}
