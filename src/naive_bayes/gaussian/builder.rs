use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use super::{
  factory::{self, GaussianNBFactory, GaussianNBParameters},
  predict_output_type::GaussianNBPredictOutputType,
  GaussianNB,
};
use crate::{
  dense_matrix::DenseMatrix,
  typed_array::{TypedArrayVec, TypedArrayWrapper},
};

#[napi(js_name = "GaussianNBBuilder")]
pub struct GaussianNBBuilder {
  pub(super) fit_data_x: SharedReference<DenseMatrix, &'static mut DenseMatrix>,
  pub(super) fit_data_y: TypedArrayVec,
  pub(super) priors: Option<Float64Array>,
  pub(super) predict_output_type: GaussianNBPredictOutputType,
}

#[napi]
impl GaussianNBBuilder {
  #[napi(constructor)]
  pub fn new(
    fit_data_x: Reference<DenseMatrix>,
    fit_data_y: TypedArrayWrapper,
    env: Env,
  ) -> Result<Self> {
    Ok(Self {
      fit_data_x: fit_data_x.share_with(env, Ok)?,
      fit_data_y: fit_data_y.into(),
      priors: None,
      predict_output_type: GaussianNBPredictOutputType::default(),
    })
  }

  #[napi]
  pub fn with_priors(&mut self, priors: Float64Array) {
    self.priors = Some(priors);
  }

  #[napi]
  pub fn with_predict_output_type(&mut self, predict_output_type: GaussianNBPredictOutputType) {
    self.predict_output_type = predict_output_type
  }

  #[napi]
  pub fn build(&mut self) -> Result<GaussianNB> {
    let fit_data_variant_type = self.fit_data_x.r#type();
    let params = factory::NewParameters {
      fit_data_x: self.fit_data_x.deref(),
      fit_data_y: &self.fit_data_y,
      predict_output_type: self.predict_output_type,
      gaussian_nb_parameters: GaussianNBParameters {
        priors: self.priors.as_ref().map(|v| v.to_vec()),
      },
    };
    Ok(GaussianNB {
      inner: GaussianNBFactory::create(params)?,
      fit_data_variant_type,
      predict_output_type: self.predict_output_type,
    })
  }
}
