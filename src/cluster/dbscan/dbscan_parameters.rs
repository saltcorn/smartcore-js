use paste::paste;
use smartcore::{
  algorithm::neighbour::KNNAlgorithmName,
  cluster::dbscan::DBSCANParameters as LibDBSCANParameters,
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  metrics::distance::{
    euclidian::Euclidian, hamming::Hamming, mahalanobis::Mahalanobis, manhattan::Manhattan,
    minkowski::Minkowski,
  },
};

pub trait DBSCANParameters: Sized {
  fn eps(self, eps: f64) -> Self;

  fn min_samples(self, min_samples: usize) -> Self;

  fn algorithm(self, algorithm: KNNAlgorithmName) -> Self;
}

macro_rules! dbscan_parameters_impl {
  (
    x_type: $x:ty,
    distance_type: $dist:ty,
  ) => {
    paste! {
        impl DBSCANParameters for LibDBSCANParameters<$x, $dist> {
            fn eps(self, eps: f64) -> Self {
                self.with_eps(eps)
            }

            fn min_samples(self, min_samples: usize) -> Self {
                self.with_min_samples(min_samples)
            }

            fn algorithm(self, algorithm: KNNAlgorithmName) -> Self {
                self.with_algorithm(algorithm.into())
            }
        }
    }
  };
}

dbscan_parameters_impl! { x_type: f64, distance_type: Euclidian<f64>, }
dbscan_parameters_impl! { x_type: f64, distance_type: Mahalanobis<f64, LibDenseMatrix<f64>>, }
dbscan_parameters_impl! { x_type: f64, distance_type: Manhattan<f64>, }
dbscan_parameters_impl! { x_type: f64, distance_type: Minkowski<f64>, }
dbscan_parameters_impl! { x_type: f32, distance_type: Euclidian<f32>, }
dbscan_parameters_impl! { x_type: f32, distance_type: Mahalanobis<f32, LibDenseMatrix<f64>>, }
dbscan_parameters_impl! { x_type: f32, distance_type: Manhattan<f32>, }
dbscan_parameters_impl! { x_type: f32, distance_type: Minkowski<f32>, }
dbscan_parameters_impl! { x_type: i32, distance_type: Euclidian<i32>, }
dbscan_parameters_impl! { x_type: i32, distance_type: Hamming<i32>, }
dbscan_parameters_impl! { x_type: i32, distance_type: Manhattan<i32>, }
dbscan_parameters_impl! { x_type: i32, distance_type: Minkowski<i32>, }
dbscan_parameters_impl! { x_type: i64, distance_type: Euclidian<i64>, }
dbscan_parameters_impl! { x_type: i64, distance_type: Manhattan<i64>, }
dbscan_parameters_impl! { x_type: i64, distance_type: Minkowski<i64>, }
dbscan_parameters_impl! { x_type: u16, distance_type: Euclidian<u16>, }
dbscan_parameters_impl! { x_type: u16, distance_type: Hamming<u16>, }
dbscan_parameters_impl! { x_type: u32, distance_type: Euclidian<u32>, }
dbscan_parameters_impl! { x_type: u32, distance_type: Manhattan<u32>, }
dbscan_parameters_impl! { x_type: u64, distance_type: Euclidian<u64>, }
dbscan_parameters_impl! { x_type: u64, distance_type: Manhattan<u64>, }
dbscan_parameters_impl! { x_type: u8, distance_type: Euclidian<u8>, }
dbscan_parameters_impl! { x_type: u8, distance_type: Hamming<u8>, }
