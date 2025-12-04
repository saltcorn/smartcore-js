import quickStart from './quick_start/index.ts'
import supervisedLearning from './supervised_learning/index.ts'
import unsupervisedLearning from './unsupervised_learning/index.ts'
import modelSelection from './model_selection/index.ts'

describe('Examples', () => {
  quickStart()
  supervisedLearning()
  unsupervisedLearning()
  modelSelection()
})
