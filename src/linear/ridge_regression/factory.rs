use napi::{Error, Result, Status};
use smartcore::linear::ridge_regression::RidgeRegressionSolverName as LibRidgeRegressionSolverName;

use super::{
  lib_ridge_regression_factory::{LibRidgeRegressionFactory, RidgeRegressionParametersDto},
  predict_output_type::RidgeRegressionPredictOutputType,
};
use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  js_number::WrappedNumber,
  traits::PredictorEstimator,
  typed_array::TypedArrayVec,
};

pub(super) struct RidgeRegressionParameters<'a> {
  pub(super) solver: Option<LibRidgeRegressionSolverName>,
  pub(super) alpha: Option<&'a WrappedNumber>,
  pub(super) normalize: Option<bool>,
}

pub struct NewParameters<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub ridge_regression_parameters: RidgeRegressionParameters<'a>,
}

impl<'a> From<NewParameters<'a>> for RidgeRegressionParametersDto<'a> {
  fn from(value: NewParameters<'a>) -> Self {
    Self {
      fit_data_x: value.fit_data_x,
      fit_data_y: value.fit_data_y,
      ridge_regression_parameters: value.ridge_regression_parameters,
    }
  }
}

pub struct RidgeRegressionFactory {}

impl RidgeRegressionFactory {
  pub fn create<'a>(params: NewParameters<'a>) -> Result<Box<dyn PredictorEstimator>> {
    let fit_data_variant_type = params.fit_data_x.r#type();
    let fit_data_y_variant_type: RidgeRegressionPredictOutputType = params.fit_data_y.try_into()?;
    match (fit_data_variant_type, fit_data_y_variant_type) {
      (DenseMatrixType::F64, RidgeRegressionPredictOutputType::I64) => {
        LibRidgeRegressionFactory::f64_i64(params.into())
      }
      (DenseMatrixType::F32, RidgeRegressionPredictOutputType::I64) => {
        LibRidgeRegressionFactory::f32_i64(params.into())
      }
      (DenseMatrixType::F64, RidgeRegressionPredictOutputType::U64) => {
        LibRidgeRegressionFactory::f64_u64(params.into())
      }
      (DenseMatrixType::F32, RidgeRegressionPredictOutputType::U64) => {
        LibRidgeRegressionFactory::f32_u64(params.into())
      }
      (DenseMatrixType::F64, RidgeRegressionPredictOutputType::I32) => {
        LibRidgeRegressionFactory::f64_i32(params.into())
      }
      (DenseMatrixType::F32, RidgeRegressionPredictOutputType::I32) => {
        LibRidgeRegressionFactory::f32_i32(params.into())
      }
      _ => Err(Error::new(Status::InvalidArg, "TODO")),
    }
  }
}
