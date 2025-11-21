use napi::{Error, Result, Status};
use smartcore::linear::linear_regression::LinearRegressionSolverName as LibLinearRegressionSolverName;

use super::{
  lib_linear_regression_factory::{LibLinearRegressionFactory, LinearRegressionParametersDto},
  predict_output_type::LinearRegressionPredictOutputType,
};
use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  traits::PredictorEstimator,
  typed_array::TypedArrayVec,
};

pub(super) struct LinearRegressionParameters {
  pub(super) solver: Option<LibLinearRegressionSolverName>,
}

pub struct NewParameters<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub linear_regression_parameters: LinearRegressionParameters,
}

impl<'a> From<NewParameters<'a>> for LinearRegressionParametersDto<'a> {
  fn from(value: NewParameters<'a>) -> Self {
    Self {
      fit_data_x: value.fit_data_x,
      fit_data_y: value.fit_data_y,
      linear_regression_parameters: value.linear_regression_parameters,
    }
  }
}

pub struct LinearRegressionFactory {}

impl LinearRegressionFactory {
  pub fn create<'a>(params: NewParameters<'a>) -> Result<Box<dyn PredictorEstimator>> {
    let fit_data_variant_type = params.fit_data_x.r#type();
    let fit_data_y_variant_type: LinearRegressionPredictOutputType =
      params.fit_data_y.try_into()?;
    match (fit_data_variant_type, fit_data_y_variant_type) {
      (DenseMatrixType::F64, LinearRegressionPredictOutputType::F64) => {
        LibLinearRegressionFactory::f64_f64(params.into())
      }
      (DenseMatrixType::F32, LinearRegressionPredictOutputType::F64) => {
        LibLinearRegressionFactory::f32_f64(params.into())
      }
      (DenseMatrixType::F64, LinearRegressionPredictOutputType::F32) => {
        LibLinearRegressionFactory::f64_f32(params.into())
      }
      (DenseMatrixType::F32, LinearRegressionPredictOutputType::F32) => {
        LibLinearRegressionFactory::f32_f32(params.into())
      }
      (DenseMatrixType::F64, LinearRegressionPredictOutputType::I64) => {
        LibLinearRegressionFactory::f64_i64(params.into())
      }
      (DenseMatrixType::F32, LinearRegressionPredictOutputType::I64) => {
        LibLinearRegressionFactory::f32_i64(params.into())
      }
      (DenseMatrixType::F64, LinearRegressionPredictOutputType::U64) => {
        LibLinearRegressionFactory::f64_u64(params.into())
      }
      (DenseMatrixType::F32, LinearRegressionPredictOutputType::U64) => {
        LibLinearRegressionFactory::f32_u64(params.into())
      }
      (DenseMatrixType::F64, LinearRegressionPredictOutputType::I32) => {
        LibLinearRegressionFactory::f64_i32(params.into())
      }
      (DenseMatrixType::F32, LinearRegressionPredictOutputType::I32) => {
        LibLinearRegressionFactory::f32_i32(params.into())
      }
      _ => Err(Error::new(
        Status::InvalidArg,
        "Unsupported fit data type. Supported types are f64, f32, i64, i32, u64, and u32.",
      )),
    }
  }
}
