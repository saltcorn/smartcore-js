use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::tree::decision_tree_classifier::{
  DecisionTreeClassifierParameters as LibDecisionTreeClassifierParameters,
  SplitCriterion as LibSplitCriterion,
};

#[napi]
pub enum SplitCriterion {
  Gini,
  Entropy,
  ClassificationError,
}

impl From<SplitCriterion> for LibSplitCriterion {
  fn from(value: SplitCriterion) -> Self {
    match value {
      SplitCriterion::Gini => LibSplitCriterion::Gini,
      SplitCriterion::Entropy => LibSplitCriterion::Entropy,
      SplitCriterion::ClassificationError => LibSplitCriterion::ClassificationError,
    }
  }
}

#[napi(js_name = "DecisionTreeClassifierParameters")]
#[derive(Debug)]
pub struct DecisionTreeClassifierParameters {
  inner: Option<LibDecisionTreeClassifierParameters>,
}

impl Default for DecisionTreeClassifierParameters {
  fn default() -> Self {
    Self {
      inner: Some(LibDecisionTreeClassifierParameters::default()),
    }
  }
}

#[napi]
impl DecisionTreeClassifierParameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: Some(LibDecisionTreeClassifierParameters::default()),
    }
  }

  #[napi]
  pub fn with_criterion(&mut self, criterion: SplitCriterion) {
    if let Some(inner) = self.inner.take() {
      self.inner = Some(inner.with_criterion(criterion.into()))
    }
  }

  #[napi]
  pub fn with_max_depth(&mut self, max_depth: i32) {
    if let Some(inner) = self.inner.take() {
      self.inner = Some(inner.with_max_depth(max_depth as u16))
    }
  }

  #[napi]
  pub fn with_min_samples_leaf(&mut self, min_samples_leaf: BigInt) {
    if let Some(inner) = self.inner.take() {
      self.inner = Some(inner.with_min_samples_leaf(min_samples_leaf.get_u64().1 as usize))
    }
  }

  #[napi]
  pub fn with_min_samples_split(&mut self, min_samples_split: BigInt) {
    if let Some(inner) = self.inner.take() {
      self.inner = Some(inner.with_min_samples_split(min_samples_split.get_u64().1 as usize))
    }
  }

  pub fn owned_inner(&self) -> LibDecisionTreeClassifierParameters {
    self.inner.as_ref().unwrap().to_owned()
  }
}
