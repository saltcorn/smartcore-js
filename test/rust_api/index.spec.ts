import lasso from './lasso.ts'
import elasticNet from './elastic_net.ts'
import dbscan from './dbscan.ts'
import extraTreesRegressor from './extra_trees_regressor.ts'
import pca from './pca.ts'
import svd from './svd.ts'
import kmeans from './kmeans.ts'
import randomForestClassifier from './random_forest_classifier.ts'
import randomForestRegressor from './random_forest_regressor.ts'
import linearRegression from './linear_regression.ts'
import logisticRegression from './logistic_regression.ts'

describe('Rust API', () => {
  describe('cluster', () => {
    describe('DBSCAN', dbscan)
    describe('KMeans', kmeans)
  })

  describe('decomposition', () => {
    describe('PCA', pca)
    describe('SVD', svd)
  })

  describe('ensemble', () => {
    describe('ExtraTreesRegressor', extraTreesRegressor)
    describe('RandomForestClassifier', randomForestClassifier)
    describe('RandomForestRegressor', randomForestRegressor)
  })

  describe('linear_model', () => {
    describe('ElasticNet', elasticNet)
    describe('Lasso', lasso)
    describe('LinearRegression', linearRegression)
    describe('logisticRegression', logisticRegression)
  })
})
