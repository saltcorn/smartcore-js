use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use super::{
  factory::{self, ElasticNetFactory, ElasticNetParameters},
  ElasticNet,
};
use crate::{
  dense_matrix::DenseMatrix,
  typed_array::{TypedArrayVec, TypedArrayWrapper},
};

#[napi(js_name = "ElasticNetBuilder")]
pub struct ElasticNetBuilder {
  pub(super) fit_data_x: SharedReference<DenseMatrix, &'static mut DenseMatrix>,
  pub(super) fit_data_y: TypedArrayVec,
  pub(super) alpha: Option<f64>,
  pub(super) l1_ratio: Option<f64>,
  pub(super) normalize: Option<bool>,
  pub(super) tol: Option<f64>,
  pub(super) max_iter: Option<usize>,
}

#[napi]
impl ElasticNetBuilder {
  #[napi(constructor)]
  pub fn new(
    fit_data_x: Reference<DenseMatrix>,
    fit_data_y: TypedArrayWrapper,
    env: Env,
  ) -> Result<Self> {
    Ok(Self {
      fit_data_x: fit_data_x.share_with(env, Ok)?,
      fit_data_y: fit_data_y.into(),
      alpha: None,
      l1_ratio: None,
      normalize: None,
      tol: None,
      max_iter: None,
    })
  }

  #[napi]
  pub fn with_alpha(&mut self, alpha: f64) {
    self.alpha = Some(alpha);
  }

  #[napi]
  pub fn with_l1_ratio(&mut self, l1_ratio: f64) {
    self.l1_ratio = Some(l1_ratio);
  }

  #[napi]
  pub fn with_normalize(&mut self, normalize: bool) {
    self.normalize = Some(normalize);
  }

  #[napi]
  pub fn with_tol(&mut self, tol: f64) {
    self.tol = Some(tol);
  }

  #[napi]
  pub fn with_max_iter(&mut self, max_iter: BigInt) {
    let max_iter = max_iter.get_u128().1 as usize;
    self.max_iter = Some(max_iter);
  }

  #[napi]
  pub fn build(&mut self) -> Result<ElasticNet> {
    let fit_data_variant_type = self.fit_data_x.r#type();
    let params = factory::NewParameters {
      fit_data_x: self.fit_data_x.deref(),
      fit_data_y: &self.fit_data_y,
      elastic_net_parameters: ElasticNetParameters {
        alpha: self.alpha,
        l1_ratio: self.l1_ratio,
        normalize: self.normalize,
        tol: self.tol,
        max_iter: self.max_iter,
      },
    };
    Ok(ElasticNet {
      inner: ElasticNetFactory::create(params)?,
      fit_data_variant_type,
      predict_output_type: self.fit_data_y.r#type().try_into()?,
    })
  }
}
