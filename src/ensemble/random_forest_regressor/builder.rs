use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use super::{
  factory::{self, RandomForestRegressorFactory, RandomForestRegressorParameters},
  RandomForestRegressor,
};
use crate::{
  dense_matrix::DenseMatrix,
  typed_array::{TypedArrayVec, TypedArrayWrapper},
};

#[napi(js_name = "RandomForestRegressorBuilder")]
pub struct RandomForestRegressorBuilder {
  pub(super) fit_data_x: SharedReference<DenseMatrix, &'static mut DenseMatrix>,
  pub(super) fit_data_y: TypedArrayVec,
  pub(super) max_depth: Option<u16>,
  pub(super) min_samples_leaf: Option<usize>,
  pub(super) min_samples_split: Option<usize>,
  pub(super) n_trees: Option<usize>,
  pub(super) m: Option<usize>,
  pub(super) keep_samples: Option<bool>,
  pub(super) seed: Option<u64>,
}

#[napi]
impl RandomForestRegressorBuilder {
  #[napi(constructor)]
  pub fn new(
    fit_data_x: Reference<DenseMatrix>,
    fit_data_y: TypedArrayWrapper,
    env: Env,
  ) -> Result<Self> {
    Ok(Self {
      fit_data_x: fit_data_x.share_with(env, Ok)?,
      fit_data_y: fit_data_y.into(),
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
  pub fn with_n_trees(&mut self, n_trees: BigInt) {
    let n_trees = n_trees.get_u128().1 as usize;
    self.n_trees = Some(n_trees);
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
  pub fn build(&mut self) -> Result<RandomForestRegressor> {
    let fit_data_variant_type = self.fit_data_x.r#type();
    let params = factory::NewParameters {
      fit_data_x: self.fit_data_x.deref(),
      fit_data_y: &self.fit_data_y,
      random_forest_regressor_parameters: RandomForestRegressorParameters {
        max_depth: self.max_depth,
        min_samples_leaf: self.min_samples_leaf,
        min_samples_split: self.min_samples_split,
        n_trees: self.n_trees,
        m: self.m,
        keep_samples: self.keep_samples,
        seed: self.seed,
      },
    };
    Ok(RandomForestRegressor {
      inner: RandomForestRegressorFactory::create(params)?,
      fit_data_variant_type,
      predict_output_type: self.fit_data_y.r#type().try_into()?,
    })
  }
}
