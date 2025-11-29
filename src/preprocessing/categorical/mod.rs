mod builder;
mod factory;
mod lib_one_hot_encoder_factory;
mod transformer_estimator;

use napi::{bindgen_prelude::Buffer, Result};
use napi_derive::napi;

use crate::{
  dense_matrix::DenseMatrix,
  traits::{Estimator, Transformer, TransformerEstimator},
};

#[napi(js_name = "OneHotEncoder")]
#[derive(Debug)]
pub struct OneHotEncoder {
  pub(super) inner: Box<dyn TransformerEstimator>,
}

#[napi]
impl OneHotEncoder {
  #[napi]
  pub fn transform(&self, x: &DenseMatrix) -> Result<DenseMatrix> {
    self.inner.transform(x)
  }

  #[napi]
  pub fn serialize(&self) -> Result<Buffer> {
    let buffer_data = Estimator::serialize(self)?;
    Ok(Buffer::from(buffer_data))
  }

  #[napi(factory)]
  pub fn deserialize(_data: Buffer) -> Result<Self> {
    unimplemented!()
  }
}

impl Estimator for OneHotEncoder {
  fn serialize(&self) -> Result<Vec<u8>> {
    unimplemented!()
  }
}

impl Transformer for OneHotEncoder {
  fn transform(&self, x: &DenseMatrix) -> Result<DenseMatrix> {
    self.inner.transform(x)
  }
}

impl TransformerEstimator for OneHotEncoder {}
