use bincode::{config::standard, serde::encode_to_vec};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  cluster::dbscan::DBSCANParameters as LibDBSCANParameters,
  metrics::distance::{euclidian::Euclidian, manhattan::Manhattan},
};

use crate::{algorithm::neighbor::KNNAlgorithmName, metrics::distance::manhattan::ManhattanU64};

define_and_base_impl! {
    feature_type: u64,
    distance_type: Euclidian<u64>,
    distance_export_type: EuclidianU64
}

impl Default for DBSCANU64EuclidianU64Parameters {
  fn default() -> Self {
    Self::new()
  }
}

#[napi]
impl DBSCANU64EuclidianU64Parameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: Default::default(),
    }
  }
}

// DBSCAN32ManhattanU64
define_and_base_impl! {
    feature_type: u64,
    distance_type: Manhattan<u64>,
    distance_export_type: ManhattanU64
}
// Euclidian -> ManhattanU64
with_distance_impl! {
    self_parameters_export_type: DBSCANU64EuclidianU64Parameters,
    other_parameters_export_type: DBSCANU64ManhattanU64Parameters,
    other_distance_export_type: ManhattanU64
}
