mod parameters;
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
  linalg::basic::matrix::DenseMatrix,
  metrics::distance::{
    euclidian::Euclidian, hamming::Hamming, mahalanobis::Mahalanobis, manhattan::Manhattan,
    minkowski::Minkowski,
  },
  neighbors::knn_regressor::KNNRegressor as LibKNNRegressor,
};

use crate::linalg::basic::matrix::{
  DenseMatrixF32, DenseMatrixF64, DenseMatrixI32, DenseMatrixI64, DenseMatrixU16, DenseMatrixU32,
  DenseMatrixU64, DenseMatrixU8,
};
use parameters::{
  KNNRegressorF32EuclidianF32Parameters, KNNRegressorF32MahalanobisF32Parameters,
  KNNRegressorF32ManhattanF32Parameters, KNNRegressorF32MinkowskiF32Parameters,
  KNNRegressorF64EuclidianF64Parameters, KNNRegressorF64MahalanobisF64Parameters,
  KNNRegressorF64ManhattanF64Parameters, KNNRegressorF64MinkowskiF64Parameters,
  KNNRegressorI32EuclidianI32Parameters, KNNRegressorI32HammingI32Parameters,
  KNNRegressorI32ManhattanI32Parameters, KNNRegressorI32MinkowskiI32Parameters,
  KNNRegressorI64EuclidianI64Parameters, KNNRegressorI64ManhattanI64Parameters,
  KNNRegressorI64MinkowskiI64Parameters, KNNRegressorU16EuclidianU16Parameters,
  KNNRegressorU16HammingU16Parameters, KNNRegressorU32EuclidianU32Parameters,
  KNNRegressorU32ManhattanU32Parameters, KNNRegressorU64EuclidianU64Parameters,
  KNNRegressorU64ManhattanU64Parameters, KNNRegressorU8EuclidianU8Parameters,
  KNNRegressorU8HammingU8Parameters,
};

define_and_impl! {
    feature_type: f32,
    target_type: i32,
    matrix_type: DenseMatrixF32,
    array_type: Int32Array,
    distance_type: Euclidian<f32>,
    parameters_type: KNNRegressorF32EuclidianF32Parameters,
    distance_export_type: EuclidianF32
}

define_and_impl! {
    feature_type: f32,
    target_type: i32,
    matrix_type: DenseMatrixF32,
    array_type: Int32Array,
    distance_type: Mahalanobis<f32, DenseMatrix<f64>>,
    parameters_type: KNNRegressorF32MahalanobisF32Parameters,
    distance_export_type: MahalanobisF32
}

define_and_impl! {
    feature_type: f32,
    target_type: i32,
    matrix_type: DenseMatrixF32,
    array_type: Int32Array,
    distance_type: Manhattan<f32>,
    parameters_type: KNNRegressorF32ManhattanF32Parameters,
    distance_export_type: ManhattanF32
}

define_and_impl! {
    feature_type: f32,
    target_type: i32,
    matrix_type: DenseMatrixF32,
    array_type: Int32Array,
    distance_type: Minkowski<f32>,
    parameters_type: KNNRegressorF32MinkowskiF32Parameters,
    distance_export_type: MinkowskiF32
}

define_and_impl! {
    feature_type: f64,
    target_type: i32,
    matrix_type: DenseMatrixF64,
    array_type: Int32Array,
    distance_type: Euclidian<f64>,
    parameters_type: KNNRegressorF64EuclidianF64Parameters,
    distance_export_type: EuclidianF64
}

define_and_impl! {
    feature_type: f64,
    target_type: i32,
    matrix_type: DenseMatrixF64,
    array_type: Int32Array,
    distance_type: Mahalanobis<f64, DenseMatrix<f64>>,
    parameters_type: KNNRegressorF64MahalanobisF64Parameters,
    distance_export_type: MahalanobisF64
}

define_and_impl! {
    feature_type: f64,
    target_type: i32,
    matrix_type: DenseMatrixF64,
    array_type: Int32Array,
    distance_type: Manhattan<f64>,
    parameters_type: KNNRegressorF64ManhattanF64Parameters,
    distance_export_type: ManhattanF64
}

define_and_impl! {
    feature_type: f64,
    target_type: i32,
    matrix_type: DenseMatrixF64,
    array_type: Int32Array,
    distance_type: Minkowski<f64>,
    parameters_type: KNNRegressorF64MinkowskiF64Parameters,
    distance_export_type: MinkowskiF64
}

define_and_impl! {
    feature_type: i32,
    target_type: i32,
    matrix_type: DenseMatrixI32,
    array_type: Int32Array,
    distance_type: Euclidian<i32>,
    parameters_type: KNNRegressorI32EuclidianI32Parameters,
    distance_export_type: EuclidianI32
}

define_and_impl! {
    feature_type: i32,
    target_type: i32,
    matrix_type: DenseMatrixI32,
    array_type: Int32Array,
    distance_type: Hamming<i32>,
    parameters_type: KNNRegressorI32HammingI32Parameters,
    distance_export_type: HammingI32
}

define_and_impl! {
    feature_type: i32,
    target_type: i32,
    matrix_type: DenseMatrixI32,
    array_type: Int32Array,
    distance_type: Manhattan<i32>,
    parameters_type: KNNRegressorI32ManhattanI32Parameters,
    distance_export_type: ManhattanI32
}

define_and_impl! {
    feature_type: i32,
    target_type: i32,
    matrix_type: DenseMatrixI32,
    array_type: Int32Array,
    distance_type: Minkowski<i32>,
    parameters_type: KNNRegressorI32MinkowskiI32Parameters,
    distance_export_type: MinkowskiI32
}

define_and_impl! {
    feature_type: i64,
    target_type: i32,
    matrix_type: DenseMatrixI64,
    array_type: Int32Array,
    distance_type: Euclidian<i64>,
    parameters_type: KNNRegressorI64EuclidianI64Parameters,
    distance_export_type: EuclidianI64
}

define_and_impl! {
    feature_type: i64,
    target_type: i32,
    matrix_type: DenseMatrixI64,
    array_type: Int32Array,
    distance_type: Manhattan<i64>,
    parameters_type: KNNRegressorI64ManhattanI64Parameters,
    distance_export_type: ManhattanI64
}

define_and_impl! {
    feature_type: i64,
    target_type: i32,
    matrix_type: DenseMatrixI64,
    array_type: Int32Array,
    distance_type: Minkowski<i64>,
    parameters_type: KNNRegressorI64MinkowskiI64Parameters,
    distance_export_type: MinkowskiI64
}

define_and_impl! {
    feature_type: u16,
    target_type: i32,
    matrix_type: DenseMatrixU16,
    array_type: Int32Array,
    distance_type: Euclidian<u16>,
    parameters_type: KNNRegressorU16EuclidianU16Parameters,
    distance_export_type: EuclidianU16
}

define_and_impl! {
    feature_type: u16,
    target_type: i32,
    matrix_type: DenseMatrixU16,
    array_type: Int32Array,
    distance_type: Hamming<u16>,
    parameters_type: KNNRegressorU16HammingU16Parameters,
    distance_export_type: HammingU16
}

define_and_impl! {
    feature_type: u32,
    target_type: i32,
    matrix_type: DenseMatrixU32,
    array_type: Int32Array,
    distance_type: Euclidian<u32>,
    parameters_type: KNNRegressorU32EuclidianU32Parameters,
    distance_export_type: EuclidianU32
}

define_and_impl! {
    feature_type: u32,
    target_type: i32,
    matrix_type: DenseMatrixU32,
    array_type: Int32Array,
    distance_type: Manhattan<u32>,
    parameters_type: KNNRegressorU32ManhattanU32Parameters,
    distance_export_type: ManhattanU32
}

define_and_impl! {
    feature_type: u64,
    target_type: i32,
    matrix_type: DenseMatrixU64,
    array_type: Int32Array,
    distance_type: Euclidian<u64>,
    parameters_type: KNNRegressorU64EuclidianU64Parameters,
    distance_export_type: EuclidianU64
}

define_and_impl! {
    feature_type: u64,
    target_type: i32,
    matrix_type: DenseMatrixU64,
    array_type: Int32Array,
    distance_type: Manhattan<u64>,
    parameters_type: KNNRegressorU64ManhattanU64Parameters,
    distance_export_type: ManhattanU64
}

define_and_impl! {
    feature_type: u8,
    target_type: i32,
    matrix_type: DenseMatrixU8,
    array_type: Int32Array,
    distance_type: Euclidian<u8>,
    parameters_type: KNNRegressorU8EuclidianU8Parameters,
    distance_export_type: EuclidianU8
}

define_and_impl! {
    feature_type: u8,
    target_type: i32,
    matrix_type: DenseMatrixU8,
    array_type: Int32Array,
    distance_type: Hamming<u8>,
    parameters_type: KNNRegressorU8HammingU8Parameters,
    distance_export_type: HammingU8
}
