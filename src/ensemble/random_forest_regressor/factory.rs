use napi::{Error, Result, Status};

use super::{
  lib_random_forest_regressor_factory::{
    LibRandomForestRegressorFactory, RandomForestRegressorParametersDto,
  },
  predict_output_type::RandomForestRegressorPredictOutputType,
};
use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  traits::PredictorEstimator,
  typed_array::TypedArrayVec,
};

pub(super) struct RandomForestRegressorParameters {
  pub(super) max_depth: Option<u16>,
  pub(super) min_samples_leaf: Option<usize>,
  pub(super) min_samples_split: Option<usize>,
  pub(super) n_trees: Option<usize>,
  pub(super) m: Option<usize>,
  pub(super) keep_samples: Option<bool>,
  pub(super) seed: Option<u64>,
}

pub struct NewParameters<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub random_forest_regressor_parameters: RandomForestRegressorParameters,
}

impl<'a> From<NewParameters<'a>> for RandomForestRegressorParametersDto<'a> {
  fn from(value: NewParameters<'a>) -> Self {
    Self {
      fit_data_x: value.fit_data_x,
      fit_data_y: value.fit_data_y,
      random_forest_regressor_parameters: value.random_forest_regressor_parameters,
    }
  }
}

pub struct RandomForestRegressorFactory {}

impl RandomForestRegressorFactory {
  pub fn create<'a>(params: NewParameters<'a>) -> Result<Box<dyn PredictorEstimator>> {
    let fit_data_variant_type = params.fit_data_x.r#type();
    let fit_data_y_variant_type: RandomForestRegressorPredictOutputType =
      params.fit_data_y.try_into()?;
    match (fit_data_variant_type, fit_data_y_variant_type) {
      (DenseMatrixType::F64, RandomForestRegressorPredictOutputType::F64) => {
        LibRandomForestRegressorFactory::f64_f64(params.into())
      }
      (DenseMatrixType::F32, RandomForestRegressorPredictOutputType::F64) => {
        LibRandomForestRegressorFactory::f32_f64(params.into())
      }
      (DenseMatrixType::F64, RandomForestRegressorPredictOutputType::F32) => {
        LibRandomForestRegressorFactory::f64_f32(params.into())
      }
      (DenseMatrixType::F32, RandomForestRegressorPredictOutputType::F32) => {
        LibRandomForestRegressorFactory::f32_f32(params.into())
      }
      (DenseMatrixType::F64, RandomForestRegressorPredictOutputType::I64) => {
        LibRandomForestRegressorFactory::f64_i64(params.into())
      }
      (DenseMatrixType::F32, RandomForestRegressorPredictOutputType::I64) => {
        LibRandomForestRegressorFactory::f32_i64(params.into())
      }
      (DenseMatrixType::F64, RandomForestRegressorPredictOutputType::U64) => {
        LibRandomForestRegressorFactory::f64_u64(params.into())
      }
      (DenseMatrixType::F32, RandomForestRegressorPredictOutputType::U64) => {
        LibRandomForestRegressorFactory::f32_u64(params.into())
      }
      (DenseMatrixType::F64, RandomForestRegressorPredictOutputType::I32) => {
        LibRandomForestRegressorFactory::f64_i32(params.into())
      }
      (DenseMatrixType::F32, RandomForestRegressorPredictOutputType::I32) => {
        LibRandomForestRegressorFactory::f32_i32(params.into())
      }
      _ => Err(Error::new(
        Status::InvalidArg,
        "Unsupported fit data type. Supported types are f64, f32, i64, i32, u64, and u32.",
      )),
    }
  }
}
