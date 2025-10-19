use bincode::{config::standard, serde::encode_to_vec};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  metrics::distance::{euclidian::Euclidian, hamming::Hamming},
  neighbors::knn_regressor::KNNRegressorParameters as LibKNNRegressorParameters,
};

use crate::{
  algorithm::neighbor::KNNAlgorithmName, metrics::distance::hamming::HammingU16,
  neighbors::KNNWeightFunction,
};

define_and_base_impl! {
    feature_type: u16,
    distance_type: Euclidian<u16>,
    distance_export_type: EuclidianU16
}

impl Default for KNNRegressorU16EuclidianU16Parameters {
  fn default() -> Self {
    Self::new()
  }
}

#[napi]
impl KNNRegressorU16EuclidianU16Parameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: Default::default(),
    }
  }
}

// KNNRegressorU16HammingU16
define_and_base_impl! {
    feature_type: u16,
    distance_type: Hamming<u16>,
    distance_export_type: HammingU16
}
// Euclidian -> HammingU16
with_distance_impl! {
    self_parameters_export_type: KNNRegressorU16EuclidianU16Parameters,
    other_parameters_export_type: KNNRegressorU16HammingU16Parameters,
    other_distance_export_type: HammingU16
}
