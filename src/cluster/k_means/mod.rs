mod builder;
mod deserialize;
mod factory;
mod lib_kmeans_factory;
mod predict_output_type;
mod predictor_estimator;
mod serialize_data;
mod variants;

use bincode::{config::standard, decode_from_slice, encode_to_vec};
use napi::{bindgen_prelude::Buffer, Error, Result, Status};
use napi_derive::napi;

use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  predict_output::PredictOutput,
  traits::{Estimator, Predictor, PredictorEstimator},
};
use predict_output_type::PredictOutputType;
use serialize_data::KMeansSerializeData;

#[napi(js_name = "KMeans")]
#[derive(Debug)]
pub struct KMeans {
  pub(super) inner: Box<dyn PredictorEstimator>,
  pub(super) fit_data_variant_type: DenseMatrixType,
  pub(super) predict_output_type: PredictOutputType,
}

#[napi]
impl KMeans {
  #[napi]
  pub fn predict(&self, x: &DenseMatrix) -> Result<PredictOutput> {
    self.inner.predict(x)
  }

  #[napi]
  pub fn serialize(&self) -> Result<Buffer> {
    let buffer_data = Estimator::serialize(self)?;
    Ok(Buffer::from(buffer_data))
  }

  #[napi(factory)]
  pub fn deserialize(data: Buffer) -> Result<Self> {
    let serialize_data: KMeansSerializeData = decode_from_slice(data.as_ref(), standard())
      .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?
      .0;
    serialize_data.try_into()
  }
}

impl Predictor for KMeans {
  fn predict(&self, x: &DenseMatrix) -> Result<PredictOutput> {
    self.inner.predict(x)
  }
}

impl Estimator for KMeans {
  fn serialize(&self) -> Result<Vec<u8>> {
    let serialize_data = KMeansSerializeData {
      fit_data_variant_type: self.fit_data_variant_type,
      predict_output_type: self.predict_output_type,
      kmeans: self.inner.serialize()?,
    };
    encode_to_vec(serialize_data, standard())
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }
}
