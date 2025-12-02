use napi::{Error, Result, Status};

use super::{
  lib_lasso_factory::{LassoParametersDto, LibLassoFactory},
  predict_output_type::LassoPredictOutputType,
};
use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  traits::PredictorEstimator,
  typed_array::TypedArrayVec,
};

pub(super) struct LassoParameters {
  pub(super) alpha: Option<f64>,
  pub(super) normalize: Option<bool>,
  pub(super) tol: Option<f64>,
  pub(super) max_iter: Option<usize>,
}

pub struct NewParameters<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub lasso_parameters: LassoParameters,
}

impl<'a> From<NewParameters<'a>> for LassoParametersDto<'a> {
  fn from(value: NewParameters<'a>) -> Self {
    Self {
      fit_data_x: value.fit_data_x,
      fit_data_y: value.fit_data_y,
      lasso_parameters: value.lasso_parameters,
    }
  }
}

pub struct LassoFactory {}

impl LassoFactory {
  pub fn create<'a>(params: NewParameters<'a>) -> Result<Box<dyn PredictorEstimator>> {
    let fit_data_variant_type = params.fit_data_x.r#type();
    let fit_data_y_variant_type: LassoPredictOutputType = params.fit_data_y.r#type().try_into()?;
    match (fit_data_variant_type, fit_data_y_variant_type) {
      (DenseMatrixType::F64, LassoPredictOutputType::F64) => {
        LibLassoFactory::f64_f64(params.into())
      }
      (DenseMatrixType::F32, LassoPredictOutputType::F64) => {
        LibLassoFactory::f32_f64(params.into())
      }
      (DenseMatrixType::F64, LassoPredictOutputType::F32) => {
        LibLassoFactory::f64_f32(params.into())
      }
      (DenseMatrixType::F32, LassoPredictOutputType::F32) => {
        LibLassoFactory::f32_f32(params.into())
      }
      (DenseMatrixType::F64, LassoPredictOutputType::I64) => {
        LibLassoFactory::f64_i64(params.into())
      }
      (DenseMatrixType::F32, LassoPredictOutputType::I64) => {
        LibLassoFactory::f32_i64(params.into())
      }
      (DenseMatrixType::F64, LassoPredictOutputType::U64) => {
        LibLassoFactory::f64_u64(params.into())
      }
      (DenseMatrixType::F32, LassoPredictOutputType::U64) => {
        LibLassoFactory::f32_u64(params.into())
      }
      (DenseMatrixType::F64, LassoPredictOutputType::I32) => {
        LibLassoFactory::f64_i32(params.into())
      }
      (DenseMatrixType::F32, LassoPredictOutputType::I32) => {
        LibLassoFactory::f32_i32(params.into())
      }
      _ => Err(Error::new(
        Status::InvalidArg,
        "Unsupported fit data type. Supported types are f64, f32, i64, i32, u64, and u32.",
      )),
    }
  }
}
