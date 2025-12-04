use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::tree::decision_tree_classifier::SplitCriterion as LibSplitCriterion;

use super::{
  factory::{self, DecisionTreeClassifierFactory, DecisionTreeClassifierParameters},
  DecisionTreeClassifier,
};
use crate::{
  dense_matrix::DenseMatrix,
  tree::decision_tree_classifier::SplitCriterion,
  typed_array::{TypedArrayVec, TypedArrayWrapper},
};

#[napi(js_name = "DecisionTreeClassifierBuilder")]
pub struct DecisionTreeClassifierBuilder {
  pub(super) fit_data_x: SharedReference<DenseMatrix, &'static mut DenseMatrix>,
  pub(super) fit_data_y: TypedArrayVec,
  pub(super) split_criterion: Option<SplitCriterion>,
  pub(super) max_depth: Option<u16>,
  pub(super) min_samples_leaf: Option<usize>,
  pub(super) min_samples_split: Option<usize>,
}

#[napi]
impl DecisionTreeClassifierBuilder {
  #[napi(constructor)]
  pub fn new(
    fit_data_x: Reference<DenseMatrix>,
    fit_data_y: TypedArrayWrapper,
    env: Env,
  ) -> Result<Self> {
    Ok(Self {
      fit_data_x: fit_data_x.share_with(env, Ok)?,
      fit_data_y: fit_data_y.into(),
      split_criterion: None,
      max_depth: None,
      min_samples_leaf: None,
      min_samples_split: None,
    })
  }

  #[napi]
  pub fn with_criterion(&mut self, split_criterion: SplitCriterion) {
    self.split_criterion = Some(split_criterion);
  }

  #[napi]
  pub fn with_max_depth(&mut self, max_depth: u32) {
    self.max_depth = Some(max_depth as u16);
  }

  #[napi]
  pub fn with_min_samples_leaf(&mut self, min_samples_leaf: BigInt) {
    let min_samples_leaf = min_samples_leaf.get_u128().1 as usize;
    self.min_samples_leaf = Some(min_samples_leaf);
  }

  #[napi]
  pub fn with_min_samples_split(&mut self, min_samples_split: BigInt) {
    let min_samples_split = min_samples_split.get_u128().1 as usize;
    self.min_samples_split = Some(min_samples_split);
  }

  #[napi]
  pub fn build(&mut self) -> Result<DecisionTreeClassifier> {
    let fit_data_variant_type = self.fit_data_x.r#type();
    let params = factory::NewParameters {
      fit_data_x: self.fit_data_x.deref(),
      fit_data_y: &self.fit_data_y,
      decision_tree_classifier_parameters: DecisionTreeClassifierParameters {
        split_criterion: self.split_criterion.map(LibSplitCriterion::from),
        max_depth: self.max_depth,
        min_samples_leaf: self.min_samples_leaf,
        min_samples_split: self.min_samples_split,
      },
    };
    Ok(DecisionTreeClassifier {
      inner: DecisionTreeClassifierFactory::create(params)?,
      fit_data_variant_type,
      predict_output_type: self.fit_data_y.r#type().try_into()?,
    })
  }
}
