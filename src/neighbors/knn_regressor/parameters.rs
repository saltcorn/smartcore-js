use napi_derive::napi;
use paste::paste;
use smartcore::{
  metrics::distance::{euclidian::Euclidian, hamming::Hamming},
  neighbors::knn_regressor::KNNRegressorParameters as LibKNNRegressorParameters,
};

use crate::{
  algorithm::neighbor::KNNAlgorithmName, metrics::distance::hamming::HammingF64,
  neighbors::KNNWeightFunction,
};

macro_rules! knn_regressor_parameters_struct {
  ( $y:ty, $d:ty, $d_name:ty ) => {
    paste! {
        #[napi(js_name=""[<KNNRegressorParameters $y:upper $d_name>]"")]
        #[derive(Debug, Clone)]
        pub struct [<$d_name KNNRegressorParameters $y:upper>] {
            inner: LibKNNRegressorParameters<$y, $d>,
        }

        #[napi]
        impl [<$d_name KNNRegressorParameters $y:upper>] {
            #[napi]
            pub fn with_k(&mut self, k: u32) {
                self.inner = self.inner.to_owned().with_k(k as usize)
            }

            #[napi]
            pub fn with_algorithm(&mut self, algorithm: KNNAlgorithmName) {
                self.inner = self.inner.to_owned().with_algorithm(algorithm.into());
            }

            #[napi]
            pub fn with_weight(&mut self, weight: KNNWeightFunction) {
                self.inner = self.inner.to_owned().with_weight(weight.into());
            }


        }
    }
  };
}

macro_rules! knn_regressor_parameters_struct_distance_impl {
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

knn_regressor_parameters_struct! {f64, Euclidian<f64>, EuclidianF64 }

impl Default for EuclidianF64KNNRegressorParametersF64 {
  fn default() -> Self {
    Self::new()
  }
}

#[napi]
impl EuclidianF64KNNRegressorParametersF64 {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: Default::default(),
    }
  }
}

knn_regressor_parameters_struct! {f64, Hamming<f64>, HammingF64 }
knn_regressor_parameters_struct_distance_impl! {EuclidianF64KNNRegressorParametersF64, HammingF64KNNRegressorParametersF64, HammingF64}
