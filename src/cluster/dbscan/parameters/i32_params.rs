use bincode::{config::standard, serde::encode_to_vec};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  cluster::dbscan::DBSCANParameters as LibDBSCANParameters,
  metrics::distance::{
    euclidian::Euclidian, hamming::Hamming, manhattan::Manhattan, minkowski::Minkowski,
  },
};

use crate::{
  algorithm::neighbor::KNNAlgorithmName,
  metrics::distance::{hamming::HammingI32, manhattan::ManhattanI32, minkowski::MinkowskiI32},
};

define_and_base_impl! {
    feature_type: i32,
    distance_type: Euclidian<i32>,
    distance_export_type: EuclidianI32
}

impl Default for DBSCANI32EuclidianI32Parameters {
  fn default() -> Self {
    Self::new()
  }
}

#[napi]
impl DBSCANI32EuclidianI32Parameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: Default::default(),
    }
  }
}

// DBSCANI32HammingI32
define_and_base_impl! {
    feature_type: i32,
    distance_type: Hamming<i32>,
    distance_export_type: HammingI32
}
// Euclidian -> HammingI32
with_distance_impl! {
    self_parameters_export_type: DBSCANI32EuclidianI32Parameters,
    other_parameters_export_type: DBSCANI32HammingI32Parameters,
    other_distance_export_type: HammingI32
}

// DBSCAN32ManhattanI32
define_and_base_impl! {
    feature_type: i32,
    distance_type: Manhattan<i32>,
    distance_export_type: ManhattanI32
}
// Euclidian -> ManhattanI32
with_distance_impl! {
    self_parameters_export_type: DBSCANI32EuclidianI32Parameters,
    other_parameters_export_type: DBSCANI32ManhattanI32Parameters,
    other_distance_export_type: ManhattanI32
}

// DBSCAN32MinkowskiI32
define_and_base_impl! {
    feature_type: i32,
    distance_type: Minkowski<i32>,
    distance_export_type: MinkowskiI32
}
// Euclidian -> MinkowskiI32
with_distance_impl! {
    self_parameters_export_type: DBSCANI32EuclidianI32Parameters,
    other_parameters_export_type: DBSCANI32MinkowskiI32Parameters,
    other_distance_export_type: MinkowskiI32
}
