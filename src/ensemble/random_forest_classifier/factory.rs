use napi::{Error, Result, Status};
use smartcore::tree::decision_tree_classifier::SplitCriterion as LibSplitCriterion;

use super::{
  lib_random_forest_classifier_factory::{
    LibRandomForestClassifierFactory, RandomForestClassifierParametersDto,
  },
  predict_output_type::RandomForestClassifierPredictOutputType,
};
use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  traits::PredictorEstimator,
  typed_array::TypedArrayVec,
};

pub(super) struct RandomForestClassifierParameters {
  pub(super) split_criterion: Option<LibSplitCriterion>,
  pub(super) max_depth: Option<u16>,
  pub(super) min_samples_leaf: Option<usize>,
  pub(super) min_samples_split: Option<usize>,
  pub(super) n_trees: Option<u16>,
  pub(super) m: Option<usize>,
  pub(super) keep_samples: Option<bool>,
  pub(super) seed: Option<u64>,
}

pub struct NewParameters<'a> {
  pub fit_data_x: &'a DenseMatrix,
  pub fit_data_y: &'a TypedArrayVec,
  pub random_forest_classifier_parameters: RandomForestClassifierParameters,
}

impl<'a> From<NewParameters<'a>> for RandomForestClassifierParametersDto<'a> {
  fn from(value: NewParameters<'a>) -> Self {
    Self {
      fit_data_x: value.fit_data_x,
      fit_data_y: value.fit_data_y,
      random_forest_classifier_parameters: value.random_forest_classifier_parameters,
    }
  }
}

pub struct RandomForestClassifierFactory {}

impl RandomForestClassifierFactory {
  pub fn create<'a>(params: NewParameters<'a>) -> Result<Box<dyn PredictorEstimator>> {
    let fit_data_variant_type = params.fit_data_x.r#type();
    let fit_data_y_variant_type: RandomForestClassifierPredictOutputType =
      params.fit_data_y.r#type().try_into()?;
    match (fit_data_variant_type, fit_data_y_variant_type) {
      (DenseMatrixType::F64, RandomForestClassifierPredictOutputType::I64) => {
        LibRandomForestClassifierFactory::f64_i64(params.into())
      }
      (DenseMatrixType::F32, RandomForestClassifierPredictOutputType::I64) => {
        LibRandomForestClassifierFactory::f32_i64(params.into())
      }
      (DenseMatrixType::F64, RandomForestClassifierPredictOutputType::U64) => {
        LibRandomForestClassifierFactory::f64_u64(params.into())
      }
      (DenseMatrixType::F32, RandomForestClassifierPredictOutputType::U64) => {
        LibRandomForestClassifierFactory::f32_u64(params.into())
      }
      (DenseMatrixType::F64, RandomForestClassifierPredictOutputType::I32) => {
        LibRandomForestClassifierFactory::f64_i32(params.into())
      }
      (DenseMatrixType::F32, RandomForestClassifierPredictOutputType::I32) => {
        LibRandomForestClassifierFactory::f32_i32(params.into())
      }
      _ => Err(Error::new(
        Status::InvalidArg,
        "Unsupported fit data type. Supported types are i64, i32, u64, and u32.",
      )),
    }
  }
}
