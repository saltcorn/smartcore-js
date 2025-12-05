mod builder;
mod deserialize;
mod factory;
mod lib_svc_factory;
mod predict_output_type;
mod predictor_estimator;
mod serialize_data;
mod variants;

use bincode::{config::standard, decode_from_slice, encode_to_vec};
use napi::bindgen_prelude::*;
use napi_derive::napi;

use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  svm::svc::predict_output_type::SVCPredictOutputType,
  traits::{Estimator, Predictor, PredictorEstimator},
  typed_array::TypedArrayWrapper,
};
use serialize_data::SVCSerializeData;

#[napi(js_name = "SVC")]
#[derive(Debug)]
#[allow(clippy::upper_case_acronyms)]
pub struct SVC<'a> {
  pub(super) inner: Box<dyn PredictorEstimator + 'a>,
  pub(super) fit_data_x_type: DenseMatrixType,
  pub(super) fit_data_y_type: SVCPredictOutputType,
}

#[napi]
impl<'a> SVC<'a> {
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
    let serialize_data: SVCSerializeData = decode_from_slice(data.as_ref(), standard())
      .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?
      .0;
    serialize_data.try_into()
  }
}

impl<'a> Predictor for SVC<'a> {
  fn predict(&self, x: &DenseMatrix) -> Result<TypedArrayWrapper> {
    self.inner.predict(x)
  }
}

impl<'a> Estimator for SVC<'a> {
  fn serialize(&self) -> Result<Vec<u8>> {
    let serialize_data = SVCSerializeData {
      fit_data_x_type: self.fit_data_x_type,
      fit_data_y_type: self.fit_data_y_type,
      svc: self.inner.serialize()?,
    };
    encode_to_vec(serialize_data, standard())
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }
}
