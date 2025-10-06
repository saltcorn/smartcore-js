import quick_start from './quick_start/index.ts'
import supervised_learning from './supervised_learning/index.ts'
import unsupervised_learning from './unsupervised_learning/index.ts'
import model_selection from './model_selection/index.ts'

describe('Examples', () => {
  quick_start()
  supervised_learning()
  unsupervised_learning()
  model_selection()
})
