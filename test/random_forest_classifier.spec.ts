import assert from 'assert'
import { ensemble } from '../src-js/index.ts'

describe('Random Forest Classifier', () => {
  it('should fit', () => {
    let x = [
      [1, 2, 3],
      [11, 12, 13],
    ]
    let y = [0, 1]
    let clf = ensemble.RandomForestClassifier.fit(x, y, null)
    let prediction = clf.predict(x)
    assert.deepEqual(prediction, y)
  })
})
