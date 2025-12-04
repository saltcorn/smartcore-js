use napi::{Error, Result, Status};

use super::{
  lib_decision_tree_regressor_factory::{
    DecisionTreeRegressorParametersDto, LibDecisionTreeRegressorFactory,
  },
  predict_output_type::DecisionTreeRegressorPredictOutputType,
};
use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  traits::PredictorEstimator,
  typed_array::TypedArrayVec,
};

pub(super) struct DecisionTreeRegressorParameters {
  pub(super) max_depth: Option<u16>,
  pub(super) min_samples_leaf: Option<usize>,
  pub(super) min_samples_split: Option<usize>,
}

pub struct NewParameters<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub decision_tree_regressor_parameters: DecisionTreeRegressorParameters,
}

impl<'a> From<NewParameters<'a>> for DecisionTreeRegressorParametersDto<'a> {
  fn from(value: NewParameters<'a>) -> Self {
    Self {
      fit_data_x: value.fit_data_x,
      fit_data_y: value.fit_data_y,
      decision_tree_regressor_parameters: value.decision_tree_regressor_parameters,
    }
  }
}

pub struct DecisionTreeRegressorFactory {}

impl DecisionTreeRegressorFactory {
  pub fn create<'a>(params: NewParameters<'a>) -> Result<Box<dyn PredictorEstimator>> {
    let fit_data_variant_type = params.fit_data_x.r#type();
    let fit_data_y_variant_type: DecisionTreeRegressorPredictOutputType =
      params.fit_data_y.r#type().try_into()?;
    match (fit_data_variant_type, fit_data_y_variant_type) {
      (DenseMatrixType::F64, DecisionTreeRegressorPredictOutputType::I64) => {
        LibDecisionTreeRegressorFactory::f64_i64(params.into())
      }
      (DenseMatrixType::F64, DecisionTreeRegressorPredictOutputType::I32) => {
        LibDecisionTreeRegressorFactory::f64_i32(params.into())
      }
      (DenseMatrixType::F32, DecisionTreeRegressorPredictOutputType::I64) => {
        LibDecisionTreeRegressorFactory::f32_i64(params.into())
      }
      (DenseMatrixType::F32, DecisionTreeRegressorPredictOutputType::I32) => {
        LibDecisionTreeRegressorFactory::f32_i32(params.into())
      }
      (DenseMatrixType::I64, DecisionTreeRegressorPredictOutputType::I64) => {
        LibDecisionTreeRegressorFactory::i64_i64(params.into())
      }
      (DenseMatrixType::I64, DecisionTreeRegressorPredictOutputType::I32) => {
        LibDecisionTreeRegressorFactory::i64_i32(params.into())
      }
      (DenseMatrixType::U64, DecisionTreeRegressorPredictOutputType::I64) => {
        LibDecisionTreeRegressorFactory::u64_i64(params.into())
      }
      (DenseMatrixType::U64, DecisionTreeRegressorPredictOutputType::I32) => {
        LibDecisionTreeRegressorFactory::u64_i32(params.into())
      }
      (DenseMatrixType::I32, DecisionTreeRegressorPredictOutputType::I64) => {
        LibDecisionTreeRegressorFactory::i32_i64(params.into())
      }
      (DenseMatrixType::I32, DecisionTreeRegressorPredictOutputType::I32) => {
        LibDecisionTreeRegressorFactory::i32_i32(params.into())
      }
      (DenseMatrixType::U32, DecisionTreeRegressorPredictOutputType::I64) => {
        LibDecisionTreeRegressorFactory::u32_i64(params.into())
      }
      (DenseMatrixType::U32, DecisionTreeRegressorPredictOutputType::I32) => {
        LibDecisionTreeRegressorFactory::u32_i32(params.into())
      }
      _ => Err(Error::new(
        Status::InvalidArg,
        "Unsupported fit data type. Supported types are f64, f32, i64, i32, u64, and u32.",
      )),
    }
  }
}
