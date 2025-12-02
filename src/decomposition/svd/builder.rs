use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use super::{
  factory::{self, SVDFactory, SVDParameters},
  SVD,
};
use crate::dense_matrix::DenseMatrix;

#[napi(js_name = "SVDBuilder")]
pub struct SVDBuilder {
  fit_data: SharedReference<DenseMatrix, &'static mut DenseMatrix>,
  n_components: Option<usize>,
}

#[napi]
impl SVDBuilder {
  #[napi(constructor)]
  pub fn new(fit_data: Reference<DenseMatrix>, env: Env) -> Result<Self> {
    Ok(Self {
      fit_data: fit_data.share_with(env, Ok)?,
      n_components: None,
    })
  }

  #[napi]
  pub fn with_n_components(&mut self, n_components: BigInt) {
    let n_components = n_components.get_u64().1 as usize;
    self.n_components = Some(n_components);
  }

  #[napi]
  pub fn build(&mut self) -> Result<SVD> {
    let fit_data_type = self.fit_data.r#type();
    let params = factory::NewParameters {
      fit_data: self.fit_data.deref(),
      svd_parameters: SVDParameters {
        n_components: self.n_components,
      },
    };
    Ok(SVD {
      inner: SVDFactory::create(params)?,
      fit_data_type,
    })
  }
}
