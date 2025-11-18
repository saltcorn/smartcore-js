use napi::{Error, Result, Status};

use super::lib_kmeans_factory::{KMeansParametersDto, LibKMeansFactory};
use crate::{
  cluster::k_means::predict_output_type::PredictOutputType,
  dense_matrix::{DenseMatrix, DenseMatrixType},
  traits::PredictorEstimator,
};

pub struct KMeansParameters {
  pub max_iter: Option<usize>,
  pub k: Option<usize>,
}

pub struct NewParameters<'a> {
  pub fit_data: &'a DenseMatrix,
  pub predict_output_type: PredictOutputType,
  pub kmeans_parameters: KMeansParameters,
}

impl<'a> From<NewParameters<'a>> for KMeansParametersDto<'a> {
  fn from(value: NewParameters<'a>) -> Self {
    Self {
      fit_data: value.fit_data,
      kmeans_parameters: value.kmeans_parameters,
    }
  }
}

pub struct KMeansFactory {}

impl KMeansFactory {
  pub fn create<'a>(params: NewParameters<'a>) -> Result<Box<dyn PredictorEstimator>> {
    let fit_data_variant_type = params.fit_data.r#type();
    match (fit_data_variant_type, params.predict_output_type) {
      (DenseMatrixType::F64, PredictOutputType::I32) => LibKMeansFactory::f64_i32(params.into()),
      (DenseMatrixType::F64, PredictOutputType::I64) => LibKMeansFactory::f64_i64(params.into()),
      (DenseMatrixType::F32, PredictOutputType::I32) => LibKMeansFactory::f32_i32(params.into()),
      (DenseMatrixType::F32, PredictOutputType::I64) => LibKMeansFactory::f32_i64(params.into()),
      (DenseMatrixType::I64, PredictOutputType::I32) => LibKMeansFactory::i64_i32(params.into()),
      (DenseMatrixType::I64, PredictOutputType::I64) => LibKMeansFactory::i64_i64(params.into()),
      (DenseMatrixType::I32, PredictOutputType::I32) => LibKMeansFactory::i32_i32(params.into()),
      (DenseMatrixType::I32, PredictOutputType::I64) => LibKMeansFactory::i32_i64(params.into()),
      (DenseMatrixType::U64, PredictOutputType::I32) => LibKMeansFactory::u64_i32(params.into()),
      (DenseMatrixType::U64, PredictOutputType::I64) => LibKMeansFactory::u64_i64(params.into()),
      (DenseMatrixType::U32, PredictOutputType::I32) => LibKMeansFactory::u32_i32(params.into()),
      (DenseMatrixType::U32, PredictOutputType::I64) => LibKMeansFactory::u32_i64(params.into()),
      _ => Err(Error::new(
        Status::InvalidArg,
        "Unsupported fit data type. Supported types are f64, f32, i64, i32, u64, and u32.",
      )),
    }
  }
}
