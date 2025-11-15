mod builder;
mod dbscan_parameters;
mod dense_matrix;
mod deserialize;
mod distance_type;
mod factory;
mod lib_dbscan_factory;
mod predictor_estimator;
mod serialize_data;
mod set_parameters;
mod variants;

use bincode::{config::standard, decode_from_slice, encode_to_vec};
use napi::bindgen_prelude::*;
use napi_derive::napi;

use dense_matrix::{DenseMatrix, DenseMatrixType};

use dense_matrix::DenseMatrixTypeVariantName;
use distance_type::DistanceVariantType;
use predictor_estimator::{Estimator, Predictor, PredictorEstimator};
use serialize_data::DBSCANSerializeData;

#[napi(js_name = "DBSCANV2")]
#[derive(Debug)]
pub struct DBSCANV2 {
  inner: Box<dyn PredictorEstimator>,
  fit_data_variant_type: DenseMatrixTypeVariantName,
  distance_type: DistanceVariantType,
}

#[napi]
impl DBSCANV2 {
  #[napi]
  pub fn predict(&self, x: &DenseMatrix) -> Result<Int32Array> {
    self.inner.predict(x)
  }

  #[napi]
  pub fn serialize(&self) -> Result<Buffer> {
    let buffer_data = Estimator::serialize(self)?;
    Ok(Buffer::from(buffer_data))
  }

  #[napi(factory)]
  pub fn deserialize(data: Buffer) -> Result<Self> {
    let serialize_data: DBSCANSerializeData = decode_from_slice(data.as_ref(), standard())
      .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?
      .0;
    serialize_data.try_into()
  }
}

impl Predictor for DBSCANV2 {
  fn predict(&self, x: &DenseMatrix) -> Result<Int32Array> {
    self.inner.predict(x)
  }
}

impl Estimator for DBSCANV2 {
  fn serialize(&self) -> Result<Vec<u8>> {
    let serialize_data = DBSCANSerializeData {
      fit_data_variant_type: self.fit_data_variant_type,
      distance_type: self.distance_type,
      dbscan: self.inner.serialize()?,
    };
    encode_to_vec(serialize_data, standard())
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }
}
