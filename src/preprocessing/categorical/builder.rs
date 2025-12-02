use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use super::{
  factory::{self, OneHotEncoderFactory},
  OneHotEncoder,
};
use crate::dense_matrix::DenseMatrix;

#[napi(js_name = "OneHotEncoderBuilder")]
pub struct OneHotEncoderBuilder {
  fit_data: SharedReference<DenseMatrix, &'static mut DenseMatrix>,
  cat_idx: Vec<usize>,
}

#[napi]
impl OneHotEncoderBuilder {
  #[napi(constructor)]
  pub fn new(fit_data: Reference<DenseMatrix>, cat_idx: BigUint64Array, env: Env) -> Result<Self> {
    Ok(Self {
      fit_data: fit_data.share_with(env, Ok)?,
      cat_idx: cat_idx.iter().copied().map(|v| v as usize).collect(),
    })
  }

  #[napi]
  pub fn build(&mut self) -> Result<OneHotEncoder> {
    let params = factory::NewParameters {
      fit_data: self.fit_data.deref(),
      cat_idx: &self.cat_idx,
    };
    Ok(OneHotEncoder {
      inner: OneHotEncoderFactory::create(params)?,
    })
  }
}
