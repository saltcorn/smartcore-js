use napi_derive::napi;
use paste::paste;
use smartcore::{
  cluster::dbscan::DBSCANParameters as LibDBSCANParameters,
  linalg::basic::matrix::DenseMatrix,
  metrics::distance::{
    euclidian::Euclidian, hamming::Hamming, mahalanobis::Mahalanobis, manhattan::Manhattan,
    minkowski::Minkowski,
  },
};

use crate::{
  algorithm::neighbor::KNNAlgorithmName,
  metrics::distance::{
    hamming::HammingF64, mahalanobis::MahalanobisF64, manhattan::ManhattanF64,
    minkowski::MinkowskiF64,
  },
};

macro_rules! dbscan_parameters_struct {
  ( $y:ty, $d:ty, $d_name:ty ) => {
    paste! {
        #[napi(js_name=""[<$d_name DBSCAN $y:upper Parameters>]"")]
        #[derive(Debug, Clone)]
        pub struct [<$d_name DBSCAN $y:upper Parameters>] {
            inner: LibDBSCANParameters<$y, $d>,
        }

        #[napi]
        impl [<$d_name DBSCAN $y:upper Parameters>] {
            #[napi]
            pub fn with_min_samples(&mut self, min_samples: i64) {
                self.inner = self.inner.to_owned().with_min_samples(min_samples as usize)
            }

            #[napi]
            pub fn with_algorithm(&mut self, algorithm: KNNAlgorithmName) {
                self.inner = self.inner.to_owned().with_algorithm(algorithm.into());
            }

            #[napi]
            pub fn with_eps(&mut self, eps: f64) {
                self.inner = self.inner.to_owned().with_eps(eps);
            }

            pub fn owned_inner(&self) -> LibDBSCANParameters<$y, $d> {
                self.inner.to_owned()
            }
        }
    }
  };
}

macro_rules! dbscan_parameters_struct_distance_impl {
  ( $ty1:ty, $ty2:ty, $ty2_d:ty ) => {
    paste! {
        #[napi]
        impl $ty1 {
            #[napi]
            #[allow(non_snake_case)]
            pub fn [<with_distance_ $ty2_d>](
                &self,
                distance: &$ty2_d,
            ) -> $ty2 {
                let inner = self.inner.to_owned().with_distance(distance.owned_inner());
                $ty2 {
                    inner
                }
            }
        }
    }
  };
}

dbscan_parameters_struct! {f64, Euclidian<f64>, EuclidianF64 }

impl Default for EuclidianF64DBSCANF64Parameters {
  fn default() -> Self {
    Self::new()
  }
}

#[napi]
impl EuclidianF64DBSCANF64Parameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: Default::default(),
    }
  }
}

dbscan_parameters_struct! {f64, Hamming<f64>, HammingF64 }
dbscan_parameters_struct_distance_impl! {EuclidianF64DBSCANF64Parameters, HammingF64DBSCANF64Parameters, HammingF64}

dbscan_parameters_struct! {f64, Mahalanobis<f64, DenseMatrix<f64>>, MahalanobisF64 }
dbscan_parameters_struct_distance_impl! {EuclidianF64DBSCANF64Parameters, MahalanobisF64DBSCANF64Parameters, MahalanobisF64}

dbscan_parameters_struct! {f64, Manhattan<f64>, ManhattanF64 }
dbscan_parameters_struct_distance_impl! {EuclidianF64DBSCANF64Parameters, ManhattanF64DBSCANF64Parameters, ManhattanF64}

dbscan_parameters_struct! {f64, Minkowski<f64>, MinkowskiF64 }
dbscan_parameters_struct_distance_impl! {EuclidianF64DBSCANF64Parameters, MinkowskiF64DBSCANF64Parameters, MinkowskiF64}
