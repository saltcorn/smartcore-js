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
    mahalanobis::MahalanobisF32, manhattan::ManhattanF32, minkowski::MinkowskiF32,
  },
};

define_and_base_impl! {
    feature_type: f32,
    distance_type: Euclidian<f32>,
    distance_export_type: EuclidianF32
}

impl Default for DBSCANF32EuclidianF32Parameters {
  fn default() -> Self {
    Self::new()
  }
}

#[napi]
impl DBSCANF32EuclidianF32Parameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: Default::default(),
    }
  }
}

// DBSCAN32MahalanobisF32
define_and_base_impl! {
    feature_type: f32,
    distance_type: Mahalanobis<f32, DenseMatrix<f64>>,
    distance_export_type: MahalanobisF32
}
// Euclidian -> MahalanobisF32
with_distance_impl! {
    self_parameters_export_type: DBSCANF32EuclidianF32Parameters,
    other_parameters_export_type: DBSCANF32MahalanobisF32Parameters,
    other_distance_export_type: MahalanobisF32
}

// DBSCAN32ManhattanF32
define_and_base_impl! {
    feature_type: f32,
    distance_type: Manhattan<f32>,
    distance_export_type: ManhattanF32
}
// Euclidian -> ManhattanF32
with_distance_impl! {
    self_parameters_export_type: DBSCANF32EuclidianF32Parameters,
    other_parameters_export_type: DBSCANF32ManhattanF32Parameters,
    other_distance_export_type: ManhattanF32
}

// DBSCAN32MinkowskiF32
define_and_base_impl! {
    feature_type: f32,
    distance_type: Minkowski<f32>,
    distance_export_type: MinkowskiF32
}
// Euclidian -> MinkowskiF32
with_distance_impl! {
    self_parameters_export_type: DBSCANF32EuclidianF32Parameters,
    other_parameters_export_type: DBSCANF32MinkowskiF32Parameters,
    other_distance_export_type: MinkowskiF32
}
