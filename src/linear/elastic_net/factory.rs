use napi::{Error, Result, Status};

use super::{
  lib_elastic_net_factory::{ElasticNetParametersDto, LibElasticNetFactory},
  predict_output_type::ElasticNetPredictOutputType,
};
use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  traits::PredictorEstimator,
  typed_array::TypedArrayVec,
};

pub(super) struct ElasticNetParameters {
  pub(super) alpha: Option<f64>,
  pub(super) l1_ratio: Option<f64>,
  pub(super) normalize: Option<bool>,
  pub(super) tol: Option<f64>,
  pub(super) max_iter: Option<usize>,
}

pub struct NewParameters<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub elastic_net_parameters: ElasticNetParameters,
}

impl<'a> From<NewParameters<'a>> for ElasticNetParametersDto<'a> {
  fn from(value: NewParameters<'a>) -> Self {
    Self {
      fit_data_x: value.fit_data_x,
      fit_data_y: value.fit_data_y,
      elastic_net_parameters: value.elastic_net_parameters,
    }
  }
}

pub struct ElasticNetFactory {}

impl ElasticNetFactory {
  pub fn create<'a>(params: NewParameters<'a>) -> Result<Box<dyn PredictorEstimator>> {
    let fit_data_variant_type = params.fit_data_x.r#type();
    let fit_data_y_variant_type: ElasticNetPredictOutputType =
      params.fit_data_y.r#type().try_into()?;
    match (fit_data_variant_type, fit_data_y_variant_type) {
      (DenseMatrixType::F64, ElasticNetPredictOutputType::F64) => {
        LibElasticNetFactory::f64_f64(params.into())
      }
      (DenseMatrixType::F32, ElasticNetPredictOutputType::F64) => {
        LibElasticNetFactory::f32_f64(params.into())
      }
      (DenseMatrixType::F64, ElasticNetPredictOutputType::F32) => {
        LibElasticNetFactory::f64_f32(params.into())
      }
      (DenseMatrixType::F32, ElasticNetPredictOutputType::F32) => {
        LibElasticNetFactory::f32_f32(params.into())
      }
      (DenseMatrixType::F64, ElasticNetPredictOutputType::I64) => {
        LibElasticNetFactory::f64_i64(params.into())
      }
      (DenseMatrixType::F32, ElasticNetPredictOutputType::I64) => {
        LibElasticNetFactory::f32_i64(params.into())
      }
      (DenseMatrixType::F64, ElasticNetPredictOutputType::U64) => {
        LibElasticNetFactory::f64_u64(params.into())
      }
      (DenseMatrixType::F32, ElasticNetPredictOutputType::U64) => {
        LibElasticNetFactory::f32_u64(params.into())
      }
      (DenseMatrixType::F64, ElasticNetPredictOutputType::I32) => {
        LibElasticNetFactory::f64_i32(params.into())
      }
      (DenseMatrixType::F32, ElasticNetPredictOutputType::I32) => {
        LibElasticNetFactory::f32_i32(params.into())
      }
      _ => Err(Error::new(
        Status::InvalidArg,
        "Unsupported fit data type. Supported types are f64, f32, i64, i32, u64, and u32.",
      )),
    }
  }
}
