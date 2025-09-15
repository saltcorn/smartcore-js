import quick_start from './quick_start'
import supervised_learning from './supervised_learning'
import unsupervised_learning from './unsupervised_learning'

describe('Examples', () => {
  describe('Quickstart', () => {
    quick_start()
  })

  describe('Supervised Learning', supervised_learning)

  describe('Unsupervised Learning', unsupervised_learning)
})
