use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use super::{
  factory::{self, LassoFactory, LassoParameters},
  Lasso,
};
use crate::{
  dense_matrix::DenseMatrix,
  typed_array::{TypedArrayVec, TypedArrayWrapper},
};

#[napi(js_name = "LassoBuilder")]
pub struct LassoBuilder {
  pub(super) fit_data_x: SharedReference<DenseMatrix, &'static mut DenseMatrix>,
  pub(super) fit_data_y: TypedArrayVec,
  pub(super) alpha: Option<f64>,
  pub(super) normalize: Option<bool>,
  pub(super) tol: Option<f64>,
  pub(super) max_iter: Option<usize>,
}

#[napi]
impl LassoBuilder {
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
  pub fn build(&mut self) -> Result<Lasso> {
    let fit_data_variant_type = self.fit_data_x.r#type();
    let params = factory::NewParameters {
      fit_data_x: self.fit_data_x.deref(),
      fit_data_y: &self.fit_data_y,
      lasso_parameters: LassoParameters {
        alpha: self.alpha,
        normalize: self.normalize,
        tol: self.tol,
        max_iter: self.max_iter,
      },
    };
    Ok(Lasso {
      inner: LassoFactory::create(params)?,
      fit_data_variant_type,
      predict_output_type: self.fit_data_y.r#type().try_into()?,
    })
  }
}
