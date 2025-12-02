use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use super::{
  factory::{self, CategoricalNBFactory, CategoricalNBParameters},
  CategoricalNB,
};
use crate::{
  dense_matrix::DenseMatrix,
  typed_array::{TypedArrayVec, TypedArrayWrapper},
};

#[napi(js_name = "CategoricalNBBuilder")]
pub struct CategoricalNBBuilder {
  pub(super) fit_data_x: SharedReference<DenseMatrix, &'static mut DenseMatrix>,
  pub(super) fit_data_y: TypedArrayVec,
  pub(super) alpha: Option<f64>,
}

#[napi]
impl CategoricalNBBuilder {
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
    })
  }

  #[napi]
  pub fn with_alpha(&mut self, alpha: f64) {
    self.alpha = Some(alpha);
  }

  #[napi]
  pub fn build(&mut self) -> Result<CategoricalNB> {
    let fit_data_variant_type = self.fit_data_x.r#type();
    let params = factory::NewParameters {
      fit_data_x: self.fit_data_x.deref(),
      fit_data_y: &self.fit_data_y,
      categorical_nb_parameters: CategoricalNBParameters { alpha: self.alpha },
    };
    Ok(CategoricalNB {
      inner: CategoricalNBFactory::create(params)?,
      fit_data_variant_type,
    })
  }
}
