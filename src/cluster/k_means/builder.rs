use std::ops::Deref;

use napi::bindgen_prelude::*;
use napi_derive::napi;

use super::{
  factory::{self, KMeansFactory, KMeansParameters},
  predict_output_type::PredictOutputType,
  v2::KMeansV2,
};
use crate::dense_matrix::DenseMatrix;

#[napi(js_name = "KMeansBuilder")]
pub struct KMeansBuilder {
  pub(super) fit_data: SharedReference<DenseMatrix, &'static mut DenseMatrix>,
  pub(super) max_iter: Option<usize>,
  pub(super) k: Option<usize>,
  pub(super) predict_output_type: PredictOutputType,
}

#[napi]
impl KMeansBuilder {
  #[napi(constructor)]
  pub fn new(fit_data: Reference<DenseMatrix>, env: Env) -> Result<Self> {
    Ok(Self {
      fit_data: fit_data.share_with(env, Ok)?,
      max_iter: None,
      k: None,
      predict_output_type: PredictOutputType::default(),
    })
  }

  #[napi]
  pub fn with_max_iter(&mut self, max_iter: BigInt) {
    let max_iter = max_iter.get_u64().1 as usize;
    self.max_iter = Some(max_iter)
  }

  #[napi]
  pub fn with_k(&mut self, k: BigInt) {
    let k = k.get_u64().1 as usize;
    self.k = Some(k)
  }

  #[napi]
  pub fn with_predict_output_type(&mut self, predict_output_type: PredictOutputType) {
    self.predict_output_type = predict_output_type
  }

  #[napi]
  pub fn build(&mut self) -> Result<KMeansV2> {
    let fit_data_variant_type = self.fit_data.inner().variant_name();
    let params = factory::NewParameters {
      fit_data: self.fit_data.deref(),
      predict_output_type: self.predict_output_type,
      kmeans_parameters: KMeansParameters {
        max_iter: self.max_iter,
        k: self.k,
      },
    };
    Ok(KMeansV2 {
      inner: KMeansFactory::create(params)?,
      fit_data_variant_type,
      predict_output_type: self.predict_output_type,
    })
  }
}
