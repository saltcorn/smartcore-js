use napi::{Error, Result, Status};
use smartcore::linear::logistic_regression::LogisticRegressionSolverName as LibLogisticRegressionSolverName;

use super::{
  lib_logistic_regression_factory::{
    LibLogisticRegressionFactory, LogisticRegressionParametersDto,
  },
  predict_output_type::LogisticRegressionPredictOutputType,
};
use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  js_number::JsNumber,
  traits::PredictorEstimator,
  typed_array::TypedArrayVec,
};

pub(super) struct LogisticRegressionParameters<'a> {
  pub(super) solver: Option<LibLogisticRegressionSolverName>,
  pub(super) alpha: Option<&'a JsNumber>,
}

pub struct NewParameters<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub logistic_regression_parameters: LogisticRegressionParameters<'a>,
}

impl<'a> From<NewParameters<'a>> for LogisticRegressionParametersDto<'a> {
  fn from(value: NewParameters<'a>) -> Self {
    Self {
      fit_data_x: value.fit_data_x,
      fit_data_y: value.fit_data_y,
      logistic_regression_parameters: value.logistic_regression_parameters,
    }
  }
}

pub struct LogisticRegressionFactory {}

impl LogisticRegressionFactory {
  pub fn create<'a>(params: NewParameters<'a>) -> Result<Box<dyn PredictorEstimator>> {
    let fit_data_variant_type = params.fit_data_x.r#type();
    let fit_data_y_variant_type: LogisticRegressionPredictOutputType =
      params.fit_data_y.try_into()?;
    match (fit_data_variant_type, fit_data_y_variant_type) {
      (DenseMatrixType::F64, LogisticRegressionPredictOutputType::I64) => {
        LibLogisticRegressionFactory::f64_i64(params.into())
      }
      (DenseMatrixType::F32, LogisticRegressionPredictOutputType::I64) => {
        LibLogisticRegressionFactory::f32_i64(params.into())
      }
      (DenseMatrixType::F64, LogisticRegressionPredictOutputType::U64) => {
        LibLogisticRegressionFactory::f64_u64(params.into())
      }
      (DenseMatrixType::F32, LogisticRegressionPredictOutputType::U64) => {
        LibLogisticRegressionFactory::f32_u64(params.into())
      }
      (DenseMatrixType::F64, LogisticRegressionPredictOutputType::I32) => {
        LibLogisticRegressionFactory::f64_i32(params.into())
      }
      (DenseMatrixType::F32, LogisticRegressionPredictOutputType::I32) => {
        LibLogisticRegressionFactory::f32_i32(params.into())
      }
      _ => Err(Error::new(Status::InvalidArg, "TODO")),
    }
  }
}
