use bincode::{config::standard, serde::encode_to_vec};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  cluster::dbscan::DBSCANParameters as LibDBSCANParameters,
  metrics::distance::{euclidian::Euclidian, hamming::Hamming},
};

use crate::{algorithm::neighbor::KNNAlgorithmName, metrics::distance::hamming::HammingU16};

define_and_base_impl! {
    feature_type: u16,
    distance_type: Euclidian<u16>,
    distance_export_type: EuclidianU16
}

impl Default for DBSCANU16EuclidianU16Parameters {
  fn default() -> Self {
    Self::new()
  }
}

#[napi]
impl DBSCANU16EuclidianU16Parameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: Default::default(),
    }
  }
}

// DBSCANU16HammingU16
define_and_base_impl! {
    feature_type: u16,
    distance_type: Hamming<u16>,
    distance_export_type: HammingU16
}
// Euclidian -> HammingU16
with_distance_impl! {
    self_parameters_export_type: DBSCANU16EuclidianU16Parameters,
    other_parameters_export_type: DBSCANU16HammingU16Parameters,
    other_distance_export_type: HammingU16
}
