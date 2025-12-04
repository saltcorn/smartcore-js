use napi::{Error, Result, Status};
use smartcore::tree::decision_tree_classifier::SplitCriterion as LibSplitCriterion;

use super::{
  lib_decision_tree_classifier_factory::{
    DecisionTreeClassifierParametersDto, LibDecisionTreeClassifierFactory,
  },
  predict_output_type::DecisionTreeClassifierPredictOutputType,
};
use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  traits::PredictorEstimator,
  typed_array::TypedArrayVec,
};

pub(super) struct DecisionTreeClassifierParameters {
  pub(super) split_criterion: Option<LibSplitCriterion>,
  pub(super) max_depth: Option<u16>,
  pub(super) min_samples_leaf: Option<usize>,
  pub(super) min_samples_split: Option<usize>,
}

pub struct NewParameters<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub decision_tree_classifier_parameters: DecisionTreeClassifierParameters,
}

impl<'a> From<NewParameters<'a>> for DecisionTreeClassifierParametersDto<'a> {
  fn from(value: NewParameters<'a>) -> Self {
    Self {
      fit_data_x: value.fit_data_x,
      fit_data_y: value.fit_data_y,
      decision_tree_classifier_parameters: value.decision_tree_classifier_parameters,
    }
  }
}

pub struct DecisionTreeClassifierFactory {}

impl DecisionTreeClassifierFactory {
  pub fn create<'a>(params: NewParameters<'a>) -> Result<Box<dyn PredictorEstimator>> {
    let fit_data_variant_type = params.fit_data_x.r#type();
    let fit_data_y_variant_type: DecisionTreeClassifierPredictOutputType =
      params.fit_data_y.r#type().try_into()?;
    match (fit_data_variant_type, fit_data_y_variant_type) {
      (DenseMatrixType::F64, DecisionTreeClassifierPredictOutputType::I64) => {
        LibDecisionTreeClassifierFactory::f64_i64(params.into())
      }
      (DenseMatrixType::F64, DecisionTreeClassifierPredictOutputType::I32) => {
        LibDecisionTreeClassifierFactory::f64_i32(params.into())
      }
      (DenseMatrixType::F32, DecisionTreeClassifierPredictOutputType::I64) => {
        LibDecisionTreeClassifierFactory::f32_i64(params.into())
      }
      (DenseMatrixType::F32, DecisionTreeClassifierPredictOutputType::I32) => {
        LibDecisionTreeClassifierFactory::f32_i32(params.into())
      }
      (DenseMatrixType::I64, DecisionTreeClassifierPredictOutputType::I64) => {
        LibDecisionTreeClassifierFactory::i64_i64(params.into())
      }
      (DenseMatrixType::I64, DecisionTreeClassifierPredictOutputType::I32) => {
        LibDecisionTreeClassifierFactory::i64_i32(params.into())
      }
      (DenseMatrixType::U64, DecisionTreeClassifierPredictOutputType::I64) => {
        LibDecisionTreeClassifierFactory::u64_i64(params.into())
      }
      (DenseMatrixType::U64, DecisionTreeClassifierPredictOutputType::I32) => {
        LibDecisionTreeClassifierFactory::u64_i32(params.into())
      }
      (DenseMatrixType::I32, DecisionTreeClassifierPredictOutputType::I64) => {
        LibDecisionTreeClassifierFactory::i32_i64(params.into())
      }
      (DenseMatrixType::I32, DecisionTreeClassifierPredictOutputType::I32) => {
        LibDecisionTreeClassifierFactory::i32_i32(params.into())
      }
      (DenseMatrixType::U32, DecisionTreeClassifierPredictOutputType::I64) => {
        LibDecisionTreeClassifierFactory::u32_i64(params.into())
      }
      (DenseMatrixType::U32, DecisionTreeClassifierPredictOutputType::I32) => {
        LibDecisionTreeClassifierFactory::u32_i32(params.into())
      }
      _ => Err(Error::new(
        Status::InvalidArg,
        "Unsupported fit data type. Supported types are f64, f32, i64, i32, u64, and u32.",
      )),
    }
  }
}
