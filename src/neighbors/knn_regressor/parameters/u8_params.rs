use bincode::{config::standard, serde::encode_to_vec};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  metrics::distance::{euclidian::Euclidian, hamming::Hamming},
  neighbors::knn_regressor::KNNRegressorParameters as LibKNNRegressorParameters,
};

use crate::{
  algorithm::neighbor::KNNAlgorithmName, metrics::distance::hamming::HammingU8,
  neighbors::KNNWeightFunction,
};

define_and_base_impl! {
    feature_type: u8,
    distance_type: Euclidian<u8>,
    distance_export_type: EuclidianU8
}

impl Default for KNNRegressorU8EuclidianU8Parameters {
  fn default() -> Self {
    Self::new()
  }
}

#[napi]
impl KNNRegressorU8EuclidianU8Parameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: Default::default(),
    }
  }
}

// KNNRegressorU8HammingU8
define_and_base_impl! {
    feature_type: u8,
    distance_type: Hamming<u8>,
    distance_export_type: HammingU8
}
// Euclidian -> HammingU8
with_distance_impl! {
    self_parameters_export_type: KNNRegressorU8EuclidianU8Parameters,
    other_parameters_export_type: KNNRegressorU8HammingU8Parameters,
    other_distance_export_type: HammingU8
}
