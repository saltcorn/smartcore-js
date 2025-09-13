use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::tree::decision_tree_regressor::DecisionTreeRegressorParameters as LibDecisionTreeRegressorParameters;

#[napi(js_name = "DecisionTreeRegressorParameters")]
#[derive(Debug)]
pub struct DecisionTreeRegressorParameters {
  inner: Option<LibDecisionTreeRegressorParameters>,
}

impl Default for DecisionTreeRegressorParameters {
  fn default() -> Self {
    Self {
      inner: Some(LibDecisionTreeRegressorParameters::default()),
    }
  }
}

#[napi]
impl DecisionTreeRegressorParameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: Some(LibDecisionTreeRegressorParameters::default()),
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

  pub fn owned_inner(&self) -> LibDecisionTreeRegressorParameters {
    self.inner.as_ref().unwrap().to_owned()
  }
}
