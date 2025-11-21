use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::tree::decision_tree_classifier::SplitCriterion as LibSplitCriterion;

use super::{
  factory::{self, RandomForestClassifierFactory, RandomForestClassifierParameters},
  RandomForestClassifier,
};
use crate::{
  dense_matrix::DenseMatrix,
  tree::decision_tree_classifier::parameters::SplitCriterion,
  typed_array::{TypedArrayVec, TypedArrayWrapper},
};

#[napi(js_name = "RandomForestClassifierBuilder")]
pub struct RandomForestClassifierBuilder {
  pub(super) fit_data_x: SharedReference<DenseMatrix, &'static mut DenseMatrix>,
  pub(super) fit_data_y: TypedArrayVec,
  pub(super) split_criterion: Option<SplitCriterion>,
  pub(super) max_depth: Option<u16>,
  pub(super) min_samples_leaf: Option<usize>,
  pub(super) min_samples_split: Option<usize>,
  pub(super) n_trees: Option<u16>,
  pub(super) m: Option<usize>,
  pub(super) keep_samples: Option<bool>,
  pub(super) seed: Option<u64>,
}

#[napi]
impl RandomForestClassifierBuilder {
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
      n_trees: None,
      m: None,
      keep_samples: None,
      seed: None,
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
  pub fn with_n_trees(&mut self, n_trees: u32) {
    self.n_trees = Some(n_trees as u16);
  }

  #[napi]
  pub fn with_m(&mut self, m: BigInt) {
    let m = m.get_u128().1 as usize;
    self.m = Some(m)
  }

  #[napi]
  pub fn with_keep_samples(&mut self, keep_samples: bool) {
    self.keep_samples = Some(keep_samples)
  }

  #[napi]
  pub fn with_seed(&mut self, seed: BigInt) {
    let seed = seed.get_u64().1;
    self.seed = Some(seed)
  }

  #[napi]
  pub fn build(&mut self) -> Result<RandomForestClassifier> {
    let fit_data_variant_type = self.fit_data_x.r#type();
    let params = factory::NewParameters {
      fit_data_x: self.fit_data_x.deref(),
      fit_data_y: &self.fit_data_y,
      random_forest_classifier_parameters: RandomForestClassifierParameters {
        split_criterion: self.split_criterion.map(LibSplitCriterion::from),
        max_depth: self.max_depth,
        min_samples_leaf: self.min_samples_leaf,
        min_samples_split: self.min_samples_split,
        n_trees: self.n_trees,
        m: self.m,
        keep_samples: self.keep_samples,
        seed: self.seed,
      },
    };
    Ok(RandomForestClassifier {
      inner: RandomForestClassifierFactory::create(params)?,
      fit_data_variant_type,
      predict_output_type: (&self.fit_data_y).try_into()?,
    })
  }
}
