use bincode::{config::standard, serde::encode_to_vec};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  metrics::distance::{euclidian::Euclidian, manhattan::Manhattan},
  neighbors::knn_regressor::KNNRegressorParameters as LibKNNRegressorParameters,
};

use crate::{
  algorithm::neighbor::KNNAlgorithmName, metrics::distance::manhattan::ManhattanU32,
  neighbors::KNNWeightFunction,
};

define_and_base_impl! {
    feature_type: u32,
    distance_type: Euclidian<u32>,
    distance_export_type: EuclidianU32
}

impl Default for KNNRegressorU32EuclidianU32Parameters {
  fn default() -> Self {
    Self::new()
  }
}

#[napi]
impl KNNRegressorU32EuclidianU32Parameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: Default::default(),
    }
  }
}

// KNNRegressor32ManhattanU32
define_and_base_impl! {
    feature_type: u32,
    distance_type: Manhattan<u32>,
    distance_export_type: ManhattanU32
}
// Euclidian -> ManhattanU32
with_distance_impl! {
    self_parameters_export_type: KNNRegressorU32EuclidianU32Parameters,
    other_parameters_export_type: KNNRegressorU32ManhattanU32Parameters,
    other_distance_export_type: ManhattanU32
}
