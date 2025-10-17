use bincode::{config::standard, serde::encode_to_vec};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  cluster::dbscan::DBSCANParameters as LibDBSCANParameters,
  linalg::basic::matrix::DenseMatrix,
  metrics::distance::{
    euclidian::Euclidian, mahalanobis::Mahalanobis, manhattan::Manhattan, minkowski::Minkowski,
  },
};

use crate::{
  algorithm::neighbor::KNNAlgorithmName,
  metrics::distance::{
    mahalanobis::MahalanobisF64, manhattan::ManhattanF64, minkowski::MinkowskiF64,
  },
};

define_and_base_impl! {
    feature_type: f64,
    distance_type: Euclidian<f64>,
    distance_export_type: EuclidianF64
}

impl Default for DBSCANF64EuclidianF64Parameters {
  fn default() -> Self {
    Self::new()
  }
}

#[napi]
impl DBSCANF64EuclidianF64Parameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: Default::default(),
    }
  }
}

// DBSCAN64MahalanobisF64
define_and_base_impl! {
    feature_type: f64,
    distance_type: Mahalanobis<f64, DenseMatrix<f64>>,
    distance_export_type: MahalanobisF64
}
// Euclidian -> MahalanobisF64
with_distance_impl! {
    self_parameters_export_type: DBSCANF64EuclidianF64Parameters,
    other_parameters_export_type: DBSCANF64MahalanobisF64Parameters,
    other_distance_export_type: MahalanobisF64
}

// DBSCAN64ManhattanF64
define_and_base_impl! {
    feature_type: f64,
    distance_type: Manhattan<f64>,
    distance_export_type: ManhattanF64
}
// Euclidian -> ManhattanF64
with_distance_impl! {
    self_parameters_export_type: DBSCANF64EuclidianF64Parameters,
    other_parameters_export_type: DBSCANF64ManhattanF64Parameters,
    other_distance_export_type: ManhattanF64
}

// DBSCAN64MinkowskiF64
define_and_base_impl! {
    feature_type: f64,
    distance_type: Minkowski<f64>,
    distance_export_type: MinkowskiF64
}
// Euclidian -> MinkowskiF64
with_distance_impl! {
    self_parameters_export_type: DBSCANF64EuclidianF64Parameters,
    other_parameters_export_type: DBSCANF64MinkowskiF64Parameters,
    other_distance_export_type: MinkowskiF64
}
