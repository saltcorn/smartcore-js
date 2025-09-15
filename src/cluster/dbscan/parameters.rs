use napi_derive::napi;
use paste::paste;
use smartcore::{
  cluster::dbscan::DBSCANParameters as LibDBSCANParameters,
  metrics::distance::{euclidian::Euclidian, hamming::Hamming},
};

use crate::{algorithm::neighbor::KNNAlgorithmName, metrics::distance::hamming::HammingF32};

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
            #[napi(factory)]
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

dbscan_parameters_struct! {f32, Euclidian<f32>, EuclidianF32 }

impl Default for EuclidianF32DBSCANF32Parameters {
  fn default() -> Self {
    Self::new()
  }
}

#[napi]
impl EuclidianF32DBSCANF32Parameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: Default::default(),
    }
  }
}

dbscan_parameters_struct! {f32, Hamming<f32>, HammingF32 }
dbscan_parameters_struct_distance_impl! {EuclidianF32DBSCANF32Parameters, HammingF32DBSCANF32Parameters, HammingF32}
