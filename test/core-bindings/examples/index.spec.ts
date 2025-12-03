import quickStart from './quick_start/index.ts'
// import supervised_learning from './supervised_learning/index.ts'
import unsupervisedLearning from './unsupervised_learning/index.ts'
import modelSelection from './model_selection/index.ts'

describe('Examples', () => {
  quickStart()
  //   supervised_learning()
  unsupervisedLearning()
  modelSelection()
})
