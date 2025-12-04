use bincode::{config::standard, decode_from_slice, encode_to_vec};
use napi::bindgen_prelude::*;
use napi_derive::napi;

use super::serialize_data::SVRSerializeData;
use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  traits::{Estimator, Predictor, PredictorEstimator},
  typed_array::TypedArrayWrapper,
};

#[napi(js_name = "SVR")]
#[derive(Debug)]
pub struct SVR<'a> {
  pub(super) inner: Box<dyn PredictorEstimator + 'a>,
  pub(super) fit_data_variant_type: DenseMatrixType,
}

#[napi]
impl<'a> SVR<'a> {
  #[napi]
  pub fn predict(&self, x: &DenseMatrix) -> Result<TypedArrayWrapper> {
    self.inner.predict(x)
  }

  #[napi]
  pub fn serialize(&self) -> Result<Buffer> {
    let buffer_data = Estimator::serialize(self)?;
    Ok(Buffer::from(buffer_data))
  }

  #[napi(factory)]
  pub fn deserialize(data: Buffer) -> Result<Self> {
    let serialize_data: SVRSerializeData = decode_from_slice(data.as_ref(), standard())
      .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?
      .0;
    serialize_data.try_into()
  }
}

impl<'a> Predictor for SVR<'a> {
  fn predict(&self, x: &DenseMatrix) -> Result<TypedArrayWrapper> {
    self.inner.predict(x)
  }
}

impl<'a> Estimator for SVR<'a> {
  fn serialize(&self) -> Result<Vec<u8>> {
    let serialize_data = SVRSerializeData {
      fit_data_variant_type: self.fit_data_variant_type,
      svr: self.inner.serialize()?,
    };
    encode_to_vec(serialize_data, standard())
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }
}
