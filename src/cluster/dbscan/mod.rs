pub mod parameters;
#[macro_use]
mod define_and_impl_macro;

use bincode::{
  config::standard,
  serde::{decode_from_slice, encode_to_vec},
};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  cluster::dbscan::DBSCAN as LibDBSCAN,
  linalg::basic::matrix::DenseMatrix,
  metrics::distance::{
    euclidian::Euclidian, hamming::Hamming, mahalanobis::Mahalanobis, manhattan::Manhattan,
    minkowski::Minkowski,
  },
};

use crate::{
  cluster::dbscan::parameters::{
    DBSCANF32EuclidianF32Parameters, DBSCANF32MahalanobisF32Parameters,
    DBSCANF32ManhattanF32Parameters, DBSCANF32MinkowskiF32Parameters,
    DBSCANF64EuclidianF64Parameters, DBSCANF64MahalanobisF64Parameters,
    DBSCANF64ManhattanF64Parameters, DBSCANF64MinkowskiF64Parameters,
    DBSCANI32EuclidianI32Parameters, DBSCANI32HammingI32Parameters,
    DBSCANI32ManhattanI32Parameters, DBSCANI32MinkowskiI32Parameters,
    DBSCANI64EuclidianI64Parameters, DBSCANI64ManhattanI64Parameters,
    DBSCANI64MinkowskiI64Parameters, DBSCANU16EuclidianU16Parameters,
    DBSCANU16HammingU16Parameters, DBSCANU32EuclidianU32Parameters,
    DBSCANU32ManhattanU32Parameters, DBSCANU64EuclidianU64Parameters,
    DBSCANU64ManhattanU64Parameters, DBSCANU8EuclidianU8Parameters, DBSCANU8HammingU8Parameters,
  },
  linalg::basic::matrix::{
    DenseMatrixF32, DenseMatrixF64, DenseMatrixI32, DenseMatrixI64, DenseMatrixU16, DenseMatrixU32,
    DenseMatrixU64, DenseMatrixU8,
  },
};

// Type selection justification (clustering algorithms - DBSCAN):
// feature_type: f32, f64
// - Feature type is typically a floating point value: f32, f64
// - f32 provided in case smaller memory footprint and faster operations or hardware acceleration are desired
// - f64 provides a higher precision and supports working with large number datasets
// ids_type:
// - Cluster labels can be negative (-1 for noise): i32, i64 (not exhaustive)
// - Sensible default: i32
//   - Handles negative values, has sufficient range, recommended for cluster labels

define_and_impl! {
    feature_type: f32,
    ids_type: i32,
    matrix_type: DenseMatrixF32,
    array_type: Int32Array,
    distance_type: Euclidian<f32>,
    parameters_type: DBSCANF32EuclidianF32Parameters,
    distance_export_type: EuclidianF32
}

define_and_impl! {
    feature_type: f32,
    ids_type: i32,
    matrix_type: DenseMatrixF32,
    array_type: Int32Array,
    distance_type: Mahalanobis<f32, DenseMatrix<f64>>,
    parameters_type: DBSCANF32MahalanobisF32Parameters,
    distance_export_type: MahalanobisF32
}

define_and_impl! {
    feature_type: f32,
    ids_type: i32,
    matrix_type: DenseMatrixF32,
    array_type: Int32Array,
    distance_type: Manhattan<f32>,
    parameters_type: DBSCANF32ManhattanF32Parameters,
    distance_export_type: ManhattanF32
}

define_and_impl! {
    feature_type: f32,
    ids_type: i32,
    matrix_type: DenseMatrixF32,
    array_type: Int32Array,
    distance_type: Minkowski<f32>,
    parameters_type: DBSCANF32MinkowskiF32Parameters,
    distance_export_type: MinkowskiF32
}

define_and_impl! {
    feature_type: f64,
    ids_type: i32,
    matrix_type: DenseMatrixF64,
    array_type: Int32Array,
    distance_type: Euclidian<f64>,
    parameters_type: DBSCANF64EuclidianF64Parameters,
    distance_export_type: EuclidianF64
}

define_and_impl! {
    feature_type: f64,
    ids_type: i32,
    matrix_type: DenseMatrixF64,
    array_type: Int32Array,
    distance_type: Mahalanobis<f64, DenseMatrix<f64>>,
    parameters_type: DBSCANF64MahalanobisF64Parameters,
    distance_export_type: MahalanobisF64
}

define_and_impl! {
    feature_type: f64,
    ids_type: i32,
    matrix_type: DenseMatrixF64,
    array_type: Int32Array,
    distance_type: Manhattan<f64>,
    parameters_type: DBSCANF64ManhattanF64Parameters,
    distance_export_type: ManhattanF64
}

define_and_impl! {
    feature_type: f64,
    ids_type: i32,
    matrix_type: DenseMatrixF64,
    array_type: Int32Array,
    distance_type: Minkowski<f64>,
    parameters_type: DBSCANF64MinkowskiF64Parameters,
    distance_export_type: MinkowskiF64
}

define_and_impl! {
    feature_type: i32,
    ids_type: i32,
    matrix_type: DenseMatrixI32,
    array_type: Int32Array,
    distance_type: Euclidian<i32>,
    parameters_type: DBSCANI32EuclidianI32Parameters,
    distance_export_type: EuclidianI32
}

define_and_impl! {
    feature_type: i32,
    ids_type: i32,
    matrix_type: DenseMatrixI32,
    array_type: Int32Array,
    distance_type: Hamming<i32>,
    parameters_type: DBSCANI32HammingI32Parameters,
    distance_export_type: HammingI32
}

define_and_impl! {
    feature_type: i32,
    ids_type: i32,
    matrix_type: DenseMatrixI32,
    array_type: Int32Array,
    distance_type: Manhattan<i32>,
    parameters_type: DBSCANI32ManhattanI32Parameters,
    distance_export_type: ManhattanI32
}

define_and_impl! {
    feature_type: i32,
    ids_type: i32,
    matrix_type: DenseMatrixI32,
    array_type: Int32Array,
    distance_type: Minkowski<i32>,
    parameters_type: DBSCANI32MinkowskiI32Parameters,
    distance_export_type: MinkowskiI32
}

define_and_impl! {
    feature_type: i64,
    ids_type: i32,
    matrix_type: DenseMatrixI64,
    array_type: Int32Array,
    distance_type: Euclidian<i64>,
    parameters_type: DBSCANI64EuclidianI64Parameters,
    distance_export_type: EuclidianI64
}

define_and_impl! {
    feature_type: i64,
    ids_type: i32,
    matrix_type: DenseMatrixI64,
    array_type: Int32Array,
    distance_type: Manhattan<i64>,
    parameters_type: DBSCANI64ManhattanI64Parameters,
    distance_export_type: ManhattanI64
}

define_and_impl! {
    feature_type: i64,
    ids_type: i32,
    matrix_type: DenseMatrixI64,
    array_type: Int32Array,
    distance_type: Minkowski<i64>,
    parameters_type: DBSCANI64MinkowskiI64Parameters,
    distance_export_type: MinkowskiI64
}

define_and_impl! {
    feature_type: u16,
    ids_type: i32,
    matrix_type: DenseMatrixU16,
    array_type: Int32Array,
    distance_type: Euclidian<u16>,
    parameters_type: DBSCANU16EuclidianU16Parameters,
    distance_export_type: EuclidianU16
}

define_and_impl! {
    feature_type: u16,
    ids_type: i32,
    matrix_type: DenseMatrixU16,
    array_type: Int32Array,
    distance_type: Hamming<u16>,
    parameters_type: DBSCANU16HammingU16Parameters,
    distance_export_type: HammingU16
}

define_and_impl! {
    feature_type: u32,
    ids_type: i32,
    matrix_type: DenseMatrixU32,
    array_type: Int32Array,
    distance_type: Euclidian<u32>,
    parameters_type: DBSCANU32EuclidianU32Parameters,
    distance_export_type: EuclidianU32
}

define_and_impl! {
    feature_type: u32,
    ids_type: i32,
    matrix_type: DenseMatrixU32,
    array_type: Int32Array,
    distance_type: Manhattan<u32>,
    parameters_type: DBSCANU32ManhattanU32Parameters,
    distance_export_type: ManhattanU32
}

define_and_impl! {
    feature_type: u64,
    ids_type: i32,
    matrix_type: DenseMatrixU64,
    array_type: Int32Array,
    distance_type: Euclidian<u64>,
    parameters_type: DBSCANU64EuclidianU64Parameters,
    distance_export_type: EuclidianU64
}

define_and_impl! {
    feature_type: u64,
    ids_type: i32,
    matrix_type: DenseMatrixU64,
    array_type: Int32Array,
    distance_type: Manhattan<u64>,
    parameters_type: DBSCANU64ManhattanU64Parameters,
    distance_export_type: ManhattanU64
}

define_and_impl! {
    feature_type: u8,
    ids_type: i32,
    matrix_type: DenseMatrixU8,
    array_type: Int32Array,
    distance_type: Euclidian<u8>,
    parameters_type: DBSCANU8EuclidianU8Parameters,
    distance_export_type: EuclidianU8
}

define_and_impl! {
    feature_type: u8,
    ids_type: i32,
    matrix_type: DenseMatrixU8,
    array_type: Int32Array,
    distance_type: Hamming<u8>,
    parameters_type: DBSCANU8HammingU8Parameters,
    distance_export_type: HammingU8
}
