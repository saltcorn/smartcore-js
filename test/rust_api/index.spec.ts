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
import ridgeRegression from './ridge_regression.ts'
import bernoulliNB from './bernoulli_nb.ts'
import categoricalNB from './categorical_nb.ts'
import gaussianNB from './gaussian_nb.ts'
import multinomialNB from './multinomial_nb.ts'
import knnClassifier from './knn_classifier.ts'
import knnRegressor from './knn_regressor.ts'
import oneHotEncoder from './one_hot_encoder.ts'
import standardScaler from './standard_scaler.ts'
import supportVectorRegressor from './support_vector_regressor.ts'

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
    describe('ridgeRegression', ridgeRegression)
  })

  describe('naive_bayes', () => {
    describe('BernoulliNB', bernoulliNB)
    describe('CategoricalNB', categoricalNB)
    describe('GaussianNB', gaussianNB)
    describe('MultinomialNB', multinomialNB)
  })

  describe('neighbors', () => {
    describe('KNNClassifier', knnClassifier)
    describe('KNNRegressor', knnRegressor)
  })

  describe('preprocessing', () => {
    describe('OneHotEncoder', oneHotEncoder)
    describe('StandardScaler', standardScaler)
  })

  describe('svm', () => {
    describe('Support Vector Regressor (SVR)', supportVectorRegressor)
  })
})
