use bincode::{config::standard, decode_from_slice, encode_to_vec};
use napi::{bindgen_prelude::Buffer, Error, Result, Status};
use napi_derive::napi;

use super::serialize_data::PCASerializeData;
use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  traits::{Estimator, Transformer, TransformerEstimator},
};

#[napi(js_name = "PCAV2")]
#[derive(Debug)]
pub struct PCAV2 {
  pub(super) inner: Box<dyn TransformerEstimator>,
  pub(super) fit_data_type: DenseMatrixType,
}

#[napi]
impl PCAV2 {
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
  pub fn deserialize(data: Buffer) -> Result<Self> {
    let serialize_data: PCASerializeData = decode_from_slice(data.as_ref(), standard())
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?
      .0;
    serialize_data.try_into()
  }
}

impl Estimator for PCAV2 {
  fn serialize(&self) -> Result<Vec<u8>> {
    let serialize_data = PCASerializeData {
      fit_data_type: self.fit_data_type,
      pca: self.inner.serialize()?,
    };
    encode_to_vec(serialize_data, standard())
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }
}

impl Transformer for PCAV2 {
  fn transform(&self, x: &DenseMatrix) -> Result<DenseMatrix> {
    self.inner.transform(x)
  }
}

impl TransformerEstimator for PCAV2 {}
