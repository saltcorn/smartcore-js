use paste::paste;
use smartcore::{
  algorithm::neighbour::KNNAlgorithmName,
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  metrics::distance::{
    euclidian::Euclidian, hamming::Hamming, mahalanobis::Mahalanobis, manhattan::Manhattan,
    minkowski::Minkowski,
  },
  neighbors::{
    knn_regressor::KNNRegressorParameters as LibKNNRegressorParameters, KNNWeightFunction,
  },
};

pub trait KNNRegressorParameters: Sized {
  fn with_k(self, k: usize) -> Self;

  fn with_algorithm(self, algorithm: KNNAlgorithmName) -> Self;

  fn with_weight(self, weight: KNNWeightFunction) -> Self;
}

macro_rules! knn_regressor_parameters_impl {
  (
    x_type: $x:ty,
    distance_type: $dist:ty,
  ) => {
    paste! {
        impl KNNRegressorParameters for LibKNNRegressorParameters<$x, $dist> {
            fn with_k(self, k: usize) -> Self {
                self.with_k(k)
            }

            fn with_algorithm(self, algorithm: KNNAlgorithmName) -> Self {
                self.with_algorithm(algorithm)
            }

            fn with_weight(self, weight: KNNWeightFunction) -> Self {
                self.with_weight(weight)
            }
        }
    }
  };
}

knn_regressor_parameters_impl! { x_type: f64, distance_type: Euclidian<f64>, }
knn_regressor_parameters_impl! { x_type: f64, distance_type: Mahalanobis<f64, LibDenseMatrix<f64>>, }
knn_regressor_parameters_impl! { x_type: f64, distance_type: Manhattan<f64>, }
knn_regressor_parameters_impl! { x_type: f64, distance_type: Minkowski<f64>, }
knn_regressor_parameters_impl! { x_type: f32, distance_type: Euclidian<f32>, }
knn_regressor_parameters_impl! { x_type: f32, distance_type: Mahalanobis<f32, LibDenseMatrix<f64>>, }
knn_regressor_parameters_impl! { x_type: f32, distance_type: Manhattan<f32>, }
knn_regressor_parameters_impl! { x_type: f32, distance_type: Minkowski<f32>, }
knn_regressor_parameters_impl! { x_type: i32, distance_type: Euclidian<i32>, }
knn_regressor_parameters_impl! { x_type: i32, distance_type: Hamming<i32>, }
knn_regressor_parameters_impl! { x_type: i32, distance_type: Manhattan<i32>, }
knn_regressor_parameters_impl! { x_type: i32, distance_type: Minkowski<i32>, }
knn_regressor_parameters_impl! { x_type: i64, distance_type: Euclidian<i64>, }
knn_regressor_parameters_impl! { x_type: i64, distance_type: Manhattan<i64>, }
knn_regressor_parameters_impl! { x_type: i64, distance_type: Minkowski<i64>, }
knn_regressor_parameters_impl! { x_type: u16, distance_type: Euclidian<u16>, }
knn_regressor_parameters_impl! { x_type: u16, distance_type: Hamming<u16>, }
knn_regressor_parameters_impl! { x_type: u32, distance_type: Euclidian<u32>, }
knn_regressor_parameters_impl! { x_type: u32, distance_type: Manhattan<u32>, }
knn_regressor_parameters_impl! { x_type: u64, distance_type: Euclidian<u64>, }
knn_regressor_parameters_impl! { x_type: u64, distance_type: Manhattan<u64>, }
knn_regressor_parameters_impl! { x_type: u8, distance_type: Euclidian<u8>, }
knn_regressor_parameters_impl! { x_type: u8, distance_type: Hamming<u8>, }
