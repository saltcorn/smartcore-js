import train_test_split from './train_test_split'
import cross_validate from './cross_validate'

export default () => {
  describe('Model Selection and Evaluation', () => {
    train_test_split()
    cross_validate()
  })
}
