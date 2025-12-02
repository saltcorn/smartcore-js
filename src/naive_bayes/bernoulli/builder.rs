use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use super::{
  factory::{self, BernoulliNBFactory, BernoulliNBParameters},
  predict_output_type::BernoulliNBPredictOutputType,
  BernoulliNB,
};
use crate::{
  dense_matrix::DenseMatrix,
  js_number::WrappedNumber,
  typed_array::{TypedArrayVec, TypedArrayWrapper},
};

#[napi(js_name = "BernoulliNBBuilder")]
pub struct BernoulliNBBuilder {
  pub(super) fit_data_x: SharedReference<DenseMatrix, &'static mut DenseMatrix>,
  pub(super) fit_data_y: TypedArrayVec,
  pub(super) alpha: Option<f64>,
  pub(super) priors: Option<Float64Array>,
  pub(super) binarize: Option<WrappedNumber>,
}

#[napi]
impl BernoulliNBBuilder {
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
      priors: None,
      binarize: None,
    })
  }

  #[napi]
  pub fn with_alpha(&mut self, alpha: f64) {
    self.alpha = Some(alpha);
  }

  #[napi]
  pub fn with_priors(&mut self, priors: Float64Array) {
    self.priors = Some(priors);
  }

  #[napi]
  pub fn with_binarize(&mut self, binarize: &WrappedNumber) {
    self.binarize = Some(binarize.to_owned());
  }

  #[napi]
  pub fn build(&mut self) -> Result<BernoulliNB> {
    let fit_data_variant_type = self.fit_data_x.r#type();
    let params = factory::NewParameters {
      fit_data_x: self.fit_data_x.deref(),
      fit_data_y: &self.fit_data_y,
      bernoulli_nb_parameters: BernoulliNBParameters {
        alpha: self.alpha,
        priors: self.priors.as_ref().map(|v| v.to_vec()),
        binarize: self.binarize.as_ref(),
      },
    };
    Ok(BernoulliNB {
      inner: BernoulliNBFactory::create(params)?,
      fit_data_variant_type,
      predict_output_type: self.fit_data_y.r#type().try_into()?,
    })
  }
}
