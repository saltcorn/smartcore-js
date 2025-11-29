mod builder;
mod deserialize;
mod factory;
mod lib_standard_scaler_factory;
mod serialize_data;
mod transformer_estimator;

use bincode::{config::standard, decode_from_slice, encode_to_vec};
use napi::{bindgen_prelude::Buffer, Error, Result, Status};
use napi_derive::napi;

use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  traits::{Estimator, Transformer, TransformerEstimator},
};
use serialize_data::StandardScalerSerializeData;

#[napi(js_name = "StandardScaler")]
#[derive(Debug)]
pub struct StandardScaler {
  pub(super) inner: Box<dyn TransformerEstimator>,
  pub(super) fit_data_type: DenseMatrixType,
}

#[napi]
impl StandardScaler {
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
    let serialize_data: StandardScalerSerializeData = decode_from_slice(data.as_ref(), standard())
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))?
      .0;
    serialize_data.try_into()
  }
}

impl Estimator for StandardScaler {
  fn serialize(&self) -> Result<Vec<u8>> {
    let serialize_data = StandardScalerSerializeData {
      fit_data_type: self.fit_data_type,
      standard_scaler: self.inner.serialize()?,
    };
    encode_to_vec(serialize_data, standard())
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }
}

impl Transformer for StandardScaler {
  fn transform(&self, x: &DenseMatrix) -> Result<DenseMatrix> {
    self.inner.transform(x)
  }
}

impl TransformerEstimator for StandardScaler {}
