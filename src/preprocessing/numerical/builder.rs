use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use super::{
  factory::{self, StandardScalerFactory},
  StandardScaler,
};
use crate::dense_matrix::DenseMatrix;

#[napi(js_name = "StandardScalerBuilder")]
pub struct StandardScalerBuilder {
  fit_data: SharedReference<DenseMatrix, &'static mut DenseMatrix>,
}

#[napi]
impl StandardScalerBuilder {
  #[napi(constructor)]
  pub fn new(fit_data: Reference<DenseMatrix>, env: Env) -> Result<Self> {
    Ok(Self {
      fit_data: fit_data.share_with(env, Ok)?,
    })
  }

  #[napi]
  pub fn build(&mut self) -> Result<StandardScaler> {
    let fit_data_type = self.fit_data.r#type();
    let params = factory::NewParameters {
      fit_data: self.fit_data.deref(),
    };
    Ok(StandardScaler {
      inner: StandardScalerFactory::create(params)?,
      fit_data_type,
    })
  }
}
