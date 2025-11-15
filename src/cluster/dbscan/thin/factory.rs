use napi::bindgen_prelude::*;

use super::{
  dense_matrix::{DenseMatrix, DenseMatrixTypeVariantName},
  lib_dbscan_factory::{DBSCANParametersDto, LibDBSCANFactory},
  set_parameters::SetParametersParams,
  DistanceName, PredictorEstimator,
};

pub struct DBSCANFactory {}

pub struct NewParameters<'a> {
  pub distance_variant_type: Option<DistanceName>,
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
    let fit_data_variant_type = params.fit_data.inner().variant_name();
    match (fit_data_variant_type, distance_type) {
      // F32I32Euclidian
      (DenseMatrixTypeVariantName::F32, DistanceName::Euclidian) => {
        LibDBSCANFactory::f32_i32_euclidian(params.into())
      }
      // F32I32Mahalanobis
      (DenseMatrixTypeVariantName::F32, DistanceName::Mahalanobis) => {
        LibDBSCANFactory::f32_i32_mahalanobis(params.into())
      }
      // F32I32Manhattan
      (DenseMatrixTypeVariantName::F32, DistanceName::Manhattan) => {
        LibDBSCANFactory::f32_i32_manhattan(params.into())
      }
      // F32I32Minkowski
      (DenseMatrixTypeVariantName::F32, DistanceName::Minkowski) => {
        LibDBSCANFactory::f32_i32_minkowski(params.into())
      }
      // F64I32Euclidian
      (DenseMatrixTypeVariantName::F64, DistanceName::Euclidian) => {
        LibDBSCANFactory::f64_i32_euclidian(params.into())
      }
      // F64I32Mahalanobis
      (DenseMatrixTypeVariantName::F64, DistanceName::Mahalanobis) => {
        LibDBSCANFactory::f64_i32_mahalanobis(params.into())
      }
      // F64I32Manhattan
      (DenseMatrixTypeVariantName::F64, DistanceName::Manhattan) => {
        LibDBSCANFactory::f64_i32_manhattan(params.into())
      }
      // F64I32Minkowski
      (DenseMatrixTypeVariantName::F64, DistanceName::Minkowski) => {
        LibDBSCANFactory::f64_i32_minkowski(params.into())
      }
      //   I32I32Euclidian
      (DenseMatrixTypeVariantName::I32, DistanceName::Euclidian) => {
        LibDBSCANFactory::i32_i32_euclidian(params.into())
      }
      //   I32I32Hamming
      (DenseMatrixTypeVariantName::I32, DistanceName::Hamming) => {
        LibDBSCANFactory::i32_i32_hamming(params.into())
      }
      //   I32I32Manhattan
      (DenseMatrixTypeVariantName::I32, DistanceName::Manhattan) => {
        LibDBSCANFactory::i32_i32_manhattan(params.into())
      }
      //   I32I32Minkowski
      (DenseMatrixTypeVariantName::I32, DistanceName::Minkowski) => {
        LibDBSCANFactory::i32_i32_minkowski(params.into())
      }
      //   I64I32Euclidian
      (DenseMatrixTypeVariantName::I64, DistanceName::Euclidian) => {
        LibDBSCANFactory::i64_i32_euclidian(params.into())
      }
      //   I64I32Manhattan
      (DenseMatrixTypeVariantName::I64, DistanceName::Manhattan) => {
        LibDBSCANFactory::i64_i32_manhattan(params.into())
      }
      //   I64I32Minkowski
      (DenseMatrixTypeVariantName::I64, DistanceName::Minkowski) => {
        LibDBSCANFactory::i64_i32_minkowski(params.into())
      }
      //   U16I32Euclidian
      (DenseMatrixTypeVariantName::U16, DistanceName::Euclidian) => {
        LibDBSCANFactory::u16_i32_euclidian(params.into())
      }
      //   U16I32Hamming
      (DenseMatrixTypeVariantName::U16, DistanceName::Hamming) => {
        LibDBSCANFactory::u16_i32_hamming(params.into())
      }
      //   U32I32Euclidian
      (DenseMatrixTypeVariantName::U32, DistanceName::Euclidian) => {
        LibDBSCANFactory::u32_i32_euclidian(params.into())
      }
      //   U32I32Manhattan
      (DenseMatrixTypeVariantName::U32, DistanceName::Manhattan) => {
        LibDBSCANFactory::u32_i32_manhattan(params.into())
      }
      //   U64I32Euclidian
      (DenseMatrixTypeVariantName::U64, DistanceName::Euclidian) => {
        LibDBSCANFactory::u64_i32_euclidian(params.into())
      }
      //   U64I32Manhattan
      (DenseMatrixTypeVariantName::U64, DistanceName::Manhattan) => {
        LibDBSCANFactory::u64_i32_manhattan(params.into())
      }
      //   U8I32Euclidian
      (DenseMatrixTypeVariantName::U8, DistanceName::Euclidian) => {
        LibDBSCANFactory::u8_i32_euclidian(params.into())
      }
      //   U8I32Hamming
      (DenseMatrixTypeVariantName::U8, DistanceName::Hamming) => {
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
