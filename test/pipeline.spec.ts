import assert from 'assert'
import { linear_model, preprocessing, dataset, model_selection, metrics } from '../dist'

let { LogisticRegression } = linear_model
let { StandardScaler } = preprocessing
let { loadIris } = dataset
let { trainTestSplit } = model_selection
let { accuracyScore } = metrics

describe('Pipelines', () => {
  it('should compose estimators', () => {
    let pipe = makePipeline(new StandardScaler(), new LogisticRegression())
    let irisData = loadIris({ returnXY: true })
    let [x, y] = irisData instanceof Array ? irisData : []
    if (!(x && y)) {
      assert.fail('Expected both x and y to be defined')
    }
    let [xTrain, xTest, yTrain, yTest] = trainTestSplit(x, y, { testSize: 0.33 })
    pipe.fit(xTrain, yTrain)
    accuracyScore(pipe.predict(xTest), yTest)
  })
})
