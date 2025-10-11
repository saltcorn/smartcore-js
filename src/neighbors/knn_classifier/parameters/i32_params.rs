use bincode::{config::standard, serde::encode_to_vec};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  metrics::distance::{
    euclidian::Euclidian, hamming::Hamming, manhattan::Manhattan, minkowski::Minkowski,
  },
  neighbors::knn_classifier::KNNClassifierParameters as LibKNNClassifierParameters,
};

use crate::{
  algorithm::neighbor::KNNAlgorithmName,
  metrics::distance::{hamming::HammingI32, manhattan::ManhattanI32, minkowski::MinkowskiI32},
  neighbors::KNNWeightFunction,
};

define_and_base_impl! {
    feature_type: i32,
    distance_type: Euclidian<i32>,
    distance_export_type: EuclidianI32
}

impl Default for KNNClassifierI32EuclidianI32Parameters {
  fn default() -> Self {
    Self::new()
  }
}

#[napi]
impl KNNClassifierI32EuclidianI32Parameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: Default::default(),
    }
  }
}

// KNNClassifierI32HammingI32
define_and_base_impl! {
    feature_type: i32,
    distance_type: Hamming<i32>,
    distance_export_type: HammingI32
}
// Euclidian -> HammingI32
with_distance_impl! {
    self_parameters_export_type: KNNClassifierI32EuclidianI32Parameters,
    other_parameters_export_type: KNNClassifierI32HammingI32Parameters,
    other_distance_export_type: HammingI32
}

// KNNClassifier32ManhattanI32
define_and_base_impl! {
    feature_type: i32,
    distance_type: Manhattan<i32>,
    distance_export_type: ManhattanI32
}
// Euclidian -> ManhattanI32
with_distance_impl! {
    self_parameters_export_type: KNNClassifierI32EuclidianI32Parameters,
    other_parameters_export_type: KNNClassifierI32ManhattanI32Parameters,
    other_distance_export_type: ManhattanI32
}

// KNNClassifier32MinkowskiI32
define_and_base_impl! {
    feature_type: i32,
    distance_type: Minkowski<i32>,
    distance_export_type: MinkowskiI32
}
// Euclidian -> MinkowskiI32
with_distance_impl! {
    self_parameters_export_type: KNNClassifierI32EuclidianI32Parameters,
    other_parameters_export_type: KNNClassifierI32MinkowskiI32Parameters,
    other_distance_export_type: MinkowskiI32
}
