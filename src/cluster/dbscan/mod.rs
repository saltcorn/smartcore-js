mod builder;
mod dbscan_parameters;
mod deserialize;
mod distance_type;
mod factory;
mod lib_dbscan_factory;
mod predictor_estimator;
mod serialize_data;
mod set_parameters;
mod supported_distances;
mod variants;

use bincode::{config::standard, decode_from_slice, encode_to_vec};
use napi::bindgen_prelude::*;
use napi_derive::napi;

use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  predict_output::PredictOutput,
  traits::{Estimator, Predictor, PredictorEstimator},
};

use distance_type::DistanceVariantType;
use serialize_data::DBSCANSerializeData;

#[napi(js_name = "DBSCAN")]
#[derive(Debug)]
pub struct DBSCAN {
  inner: Box<dyn PredictorEstimator>,
  fit_data_variant_type: DenseMatrixType,
  distance_type: DistanceVariantType,
}

#[napi]
impl DBSCAN {
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
    let serialize_data: DBSCANSerializeData = decode_from_slice(data.as_ref(), standard())
      .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?
      .0;
    serialize_data.try_into()
  }
}

impl Predictor for DBSCAN {
  fn predict(&self, x: &DenseMatrix) -> Result<PredictOutput> {
    self.inner.predict(x)
  }
}

impl Estimator for DBSCAN {
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
