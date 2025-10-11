use bincode::{config::standard, serde::encode_to_vec};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  metrics::distance::{euclidian::Euclidian, manhattan::Manhattan, minkowski::Minkowski},
  neighbors::knn_regressor::KNNRegressorParameters as LibKNNRegressorParameters,
};

use crate::{
  algorithm::neighbor::KNNAlgorithmName,
  metrics::distance::{manhattan::ManhattanI64, minkowski::MinkowskiI64},
  neighbors::KNNWeightFunction,
};

define_and_base_impl! {
    feature_type: i64,
    distance_type: Euclidian<i64>,
    distance_export_type: EuclidianI64
}

impl Default for KNNRegressorI64EuclidianI64Parameters {
  fn default() -> Self {
    Self::new()
  }
}

#[napi]
impl KNNRegressorI64EuclidianI64Parameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: Default::default(),
    }
  }
}

// KNNRegressorI64ManhattanI64
define_and_base_impl! {
    feature_type: i64,
    distance_type: Manhattan<i64>,
    distance_export_type: ManhattanI64
}
// Euclidian -> ManhattanI64
with_distance_impl! {
    self_parameters_export_type: KNNRegressorI64EuclidianI64Parameters,
    other_parameters_export_type: KNNRegressorI64ManhattanI64Parameters,
    other_distance_export_type: ManhattanI64
}

// KNNRegressorI64MinkowskiI64
define_and_base_impl! {
    feature_type: i64,
    distance_type: Minkowski<i64>,
    distance_export_type: MinkowskiI64
}
// Euclidian -> MinkowskiI64
with_distance_impl! {
    self_parameters_export_type: KNNRegressorI64EuclidianI64Parameters,
    other_parameters_export_type: KNNRegressorI64MinkowskiI64Parameters,
    other_distance_export_type: MinkowskiI64
}
