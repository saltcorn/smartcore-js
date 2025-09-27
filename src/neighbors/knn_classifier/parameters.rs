use napi_derive::napi;
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix,
  metrics::distance::{
    euclidian::Euclidian, hamming::Hamming, mahalanobis::Mahalanobis, manhattan::Manhattan,
    minkowski::Minkowski,
  },
  neighbors::knn_classifier::KNNClassifierParameters as LibKNNClassifierParameters,
};

use crate::{
  algorithm::neighbor::KNNAlgorithmName,
  metrics::distance::{
    euclidian::EuclidianF64, hamming::HammingF64, mahalanobis::MahalanobisF64,
    manhattan::ManhattanF64, minkowski::MinkowskiF64,
  },
  neighbors::KNNWeightFunction,
};

macro_rules! knn_classifier_parameters_struct {
  ( $y:ty, $d:ty, $d_name:ty ) => {
    paste! {
        #[napi(js_name=""[<KNNClassifier $y:upper $d_name Parameters>]"")]
        #[derive(Debug, Clone)]
        pub struct [<KNNClassifier $y:upper $d_name Parameters>] {
            inner: LibKNNClassifierParameters<$y, $d>,
        }

        #[napi]
        impl [<KNNClassifier $y:upper $d_name Parameters>] {
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

        impl AsRef<LibKNNClassifierParameters<$y, $d>> for [<KNNClassifier $y:upper $d_name Parameters>] {
            fn as_ref(&self) -> &LibKNNClassifierParameters<$y, $d> {
                &self.inner
            }
        }
    }
  };
}

macro_rules! knn_classifier_parameters_struct_distance_impl {
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

knn_classifier_parameters_struct! {f64, Euclidian<f64>, EuclidianF64 }

impl Default for KNNClassifierF64EuclidianF64Parameters {
  fn default() -> Self {
    Self::new()
  }
}

#[napi]
impl KNNClassifierF64EuclidianF64Parameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: Default::default(),
    }
  }
}

knn_classifier_parameters_struct! {f64, Hamming<f64>, HammingF64 }
knn_classifier_parameters_struct! {f64, Mahalanobis<f64, DenseMatrix<f64>>, MahalanobisF64 }
knn_classifier_parameters_struct! {f64, Manhattan<f64>, ManhattanF64 }
knn_classifier_parameters_struct! {f64, Minkowski<f64>, MinkowskiF64 }

knn_classifier_parameters_struct_distance_impl! {KNNClassifierF64EuclidianF64Parameters, KNNClassifierF64HammingF64Parameters, HammingF64}
knn_classifier_parameters_struct_distance_impl! {KNNClassifierF64EuclidianF64Parameters, KNNClassifierF64MahalanobisF64Parameters, MahalanobisF64}
knn_classifier_parameters_struct_distance_impl! {KNNClassifierF64EuclidianF64Parameters, KNNClassifierF64ManhattanF64Parameters, ManhattanF64}
knn_classifier_parameters_struct_distance_impl! {KNNClassifierF64EuclidianF64Parameters, KNNClassifierF64MinkowskiF64Parameters, MinkowskiF64}

knn_classifier_parameters_struct_distance_impl! {KNNClassifierF64HammingF64Parameters, KNNClassifierF64EuclidianF64Parameters, EuclidianF64}
knn_classifier_parameters_struct_distance_impl! {KNNClassifierF64HammingF64Parameters, KNNClassifierF64MahalanobisF64Parameters, MahalanobisF64}
knn_classifier_parameters_struct_distance_impl! {KNNClassifierF64HammingF64Parameters, KNNClassifierF64ManhattanF64Parameters, ManhattanF64}
knn_classifier_parameters_struct_distance_impl! {KNNClassifierF64HammingF64Parameters, KNNClassifierF64MinkowskiF64Parameters, MinkowskiF64}

knn_classifier_parameters_struct_distance_impl! {KNNClassifierF64MahalanobisF64Parameters, KNNClassifierF64EuclidianF64Parameters, EuclidianF64}
knn_classifier_parameters_struct_distance_impl! {KNNClassifierF64MahalanobisF64Parameters, KNNClassifierF64HammingF64Parameters, HammingF64}
knn_classifier_parameters_struct_distance_impl! {KNNClassifierF64MahalanobisF64Parameters, KNNClassifierF64ManhattanF64Parameters, ManhattanF64}
knn_classifier_parameters_struct_distance_impl! {KNNClassifierF64MahalanobisF64Parameters, KNNClassifierF64MinkowskiF64Parameters, MinkowskiF64}

knn_classifier_parameters_struct_distance_impl! {KNNClassifierF64ManhattanF64Parameters, KNNClassifierF64EuclidianF64Parameters, EuclidianF64}
knn_classifier_parameters_struct_distance_impl! {KNNClassifierF64ManhattanF64Parameters, KNNClassifierF64HammingF64Parameters, HammingF64}
knn_classifier_parameters_struct_distance_impl! {KNNClassifierF64ManhattanF64Parameters, KNNClassifierF64MahalanobisF64Parameters, MahalanobisF64}
knn_classifier_parameters_struct_distance_impl! {KNNClassifierF64ManhattanF64Parameters, KNNClassifierF64MinkowskiF64Parameters, MinkowskiF64}

knn_classifier_parameters_struct_distance_impl! {KNNClassifierF64MinkowskiF64Parameters, KNNClassifierF64EuclidianF64Parameters, EuclidianF64}
knn_classifier_parameters_struct_distance_impl! {KNNClassifierF64MinkowskiF64Parameters, KNNClassifierF64HammingF64Parameters, HammingF64}
knn_classifier_parameters_struct_distance_impl! {KNNClassifierF64MinkowskiF64Parameters, KNNClassifierF64MahalanobisF64Parameters, MahalanobisF64}
knn_classifier_parameters_struct_distance_impl! {KNNClassifierF64MinkowskiF64Parameters, KNNClassifierF64ManhattanF64Parameters, ManhattanF64}
