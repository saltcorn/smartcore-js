use napi::bindgen_prelude::*;

use super::{
  lib_dbscan_factory::{DBSCANParametersDto, LibDBSCANFactory},
  set_parameters::SetParametersParams,
  supported_distances::SupportedDistances,
  DistanceVariantType,
};
use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  traits::PredictorEstimator,
};

pub struct DBSCANFactory {}

pub struct NewParameters<'a> {
  pub distance_variant_type: Option<DistanceVariantType>,
  pub fit_data: &'a DenseMatrix,
  pub dbscan_parameters: SetParametersParams,
  pub data: Option<&'a &'static mut DenseMatrix>,
  pub p: Option<u16>,
}

impl<'a> From<NewParameters<'a>> for DBSCANParametersDto<'a> {
  fn from(value: NewParameters<'a>) -> Self {
    Self {
      fit_data: value.fit_data,
      dbscan_parameters: value.dbscan_parameters,
      data: value.data,
      p: value.p,
    }
  }
}

impl DBSCANFactory {
  pub fn create<'a>(params: NewParameters<'a>) -> Result<Box<dyn PredictorEstimator>> {
    let distance_type = params.distance_variant_type.unwrap_or_default();
    let fit_data_variant_type = params.fit_data.r#type();
    match (fit_data_variant_type, distance_type) {
      // F32I32Euclidian
      (DenseMatrixType::F32, DistanceVariantType::Euclidian) => {
        LibDBSCANFactory::f32_i32_euclidian(params.into())
      }
      // F32I32Mahalanobis
      (DenseMatrixType::F32, DistanceVariantType::Mahalanobis) => {
        LibDBSCANFactory::f32_i32_mahalanobis(params.into())
      }
      // F32I32Manhattan
      (DenseMatrixType::F32, DistanceVariantType::Manhattan) => {
        LibDBSCANFactory::f32_i32_manhattan(params.into())
      }
      // F32I32Minkowski
      (DenseMatrixType::F32, DistanceVariantType::Minkowski) => {
        LibDBSCANFactory::f32_i32_minkowski(params.into())
      }
      // F64I32Euclidian
      (DenseMatrixType::F64, DistanceVariantType::Euclidian) => {
        LibDBSCANFactory::f64_i32_euclidian(params.into())
      }
      // F64I32Mahalanobis
      (DenseMatrixType::F64, DistanceVariantType::Mahalanobis) => {
        LibDBSCANFactory::f64_i32_mahalanobis(params.into())
      }
      // F64I32Manhattan
      (DenseMatrixType::F64, DistanceVariantType::Manhattan) => {
        LibDBSCANFactory::f64_i32_manhattan(params.into())
      }
      // F64I32Minkowski
      (DenseMatrixType::F64, DistanceVariantType::Minkowski) => {
        LibDBSCANFactory::f64_i32_minkowski(params.into())
      }
      //   I32I32Euclidian
      (DenseMatrixType::I32, DistanceVariantType::Euclidian) => {
        LibDBSCANFactory::i32_i32_euclidian(params.into())
      }
      //   I32I32Hamming
      (DenseMatrixType::I32, DistanceVariantType::Hamming) => {
        LibDBSCANFactory::i32_i32_hamming(params.into())
      }
      //   I32I32Manhattan
      (DenseMatrixType::I32, DistanceVariantType::Manhattan) => {
        LibDBSCANFactory::i32_i32_manhattan(params.into())
      }
      //   I32I32Minkowski
      (DenseMatrixType::I32, DistanceVariantType::Minkowski) => {
        LibDBSCANFactory::i32_i32_minkowski(params.into())
      }
      //   I64I32Euclidian
      (DenseMatrixType::I64, DistanceVariantType::Euclidian) => {
        LibDBSCANFactory::i64_i32_euclidian(params.into())
      }
      //   I64I32Manhattan
      (DenseMatrixType::I64, DistanceVariantType::Manhattan) => {
        LibDBSCANFactory::i64_i32_manhattan(params.into())
      }
      //   I64I32Minkowski
      (DenseMatrixType::I64, DistanceVariantType::Minkowski) => {
        LibDBSCANFactory::i64_i32_minkowski(params.into())
      }
      //   U16I32Euclidian
      (DenseMatrixType::U16, DistanceVariantType::Euclidian) => {
        LibDBSCANFactory::u16_i32_euclidian(params.into())
      }
      //   U16I32Hamming
      (DenseMatrixType::U16, DistanceVariantType::Hamming) => {
        LibDBSCANFactory::u16_i32_hamming(params.into())
      }
      //   U32I32Euclidian
      (DenseMatrixType::U32, DistanceVariantType::Euclidian) => {
        LibDBSCANFactory::u32_i32_euclidian(params.into())
      }
      //   U32I32Manhattan
      (DenseMatrixType::U32, DistanceVariantType::Manhattan) => {
        LibDBSCANFactory::u32_i32_manhattan(params.into())
      }
      //   U64I32Euclidian
      (DenseMatrixType::U64, DistanceVariantType::Euclidian) => {
        LibDBSCANFactory::u64_i32_euclidian(params.into())
      }
      //   U64I32Manhattan
      (DenseMatrixType::U64, DistanceVariantType::Manhattan) => {
        LibDBSCANFactory::u64_i32_manhattan(params.into())
      }
      //   U8I32Euclidian
      (DenseMatrixType::U8, DistanceVariantType::Euclidian) => {
        LibDBSCANFactory::u8_i32_euclidian(params.into())
      }
      //   U8I32Hamming
      (DenseMatrixType::U8, DistanceVariantType::Hamming) => {
        LibDBSCANFactory::u8_i32_hamming(params.into())
      }
      _ => Err(Error::new(
        Status::GenericFailure,
        format!(
          "Supported distances for '{}' data are: {}. Supported number types for '{}' are '{}'.",
          fit_data_variant_type,
          fit_data_variant_type.supported_distances().join("/"),
          distance_type,
          distance_type.supported_data_types().join("/")
        ),
      )),
    }
  }
}
