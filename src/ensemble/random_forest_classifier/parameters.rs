use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::ensemble::random_forest_classifier::RandomForestClassifierParameters as LibRandomForestClassifierParameters;

use crate::tree::decision_tree_classifier::parameters::SplitCriterion;

#[napi(js_name = "RandomForestClassifierParameters")]
#[derive(Debug)]
pub struct RandomForestClassifierParameters {
  inner: Option<LibRandomForestClassifierParameters>,
}

impl Default for RandomForestClassifierParameters {
  fn default() -> Self {
    Self {
      inner: Some(LibRandomForestClassifierParameters::default()),
    }
  }
}

#[napi]
impl RandomForestClassifierParameters {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self {
      inner: Some(LibRandomForestClassifierParameters::default()),
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

  #[napi]
  pub fn with_n_trees(&mut self, n_trees: i16) {
    if let Some(inner) = self.inner.take() {
      self.inner = Some(inner.with_n_trees(n_trees as u16))
    }
  }

  #[napi]
  pub fn with_m(&mut self, m: i64) {
    if let Some(inner) = self.inner.take() {
      self.inner = Some(inner.with_m(m as usize))
    }
  }

  #[napi]
  pub fn with_keep_samples(&mut self, keep_samples: bool) {
    if let Some(inner) = self.inner.take() {
      self.inner = Some(inner.with_keep_samples(keep_samples))
    }
  }

  #[napi]
  pub fn with_seed(&mut self, seed: i64) {
    if let Some(inner) = self.inner.take() {
      self.inner = Some(inner.with_min_samples_split(seed as usize))
    }
  }

  pub fn owned_inner(&self) -> LibRandomForestClassifierParameters {
    self.inner.as_ref().unwrap().to_owned()
  }
}
