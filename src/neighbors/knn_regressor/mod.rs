mod builder;
mod deserialize;
mod factory;
mod knn_regressor_parameters;
mod lib_knn_regressor_factory;
mod predict_output_type;
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
  distance_type::DistanceVariantType,
  traits::{Estimator, Predictor, PredictorEstimator},
  typed_array::TypedArrayWrapper,
};

use predict_output_type::KNNRegressorPredictOutputType;
use serialize_data::KNNRegressorSerializeData;

#[napi(js_name = "KNNRegressor")]
#[derive(Debug)]
pub struct KNNRegressor {
  inner: Box<dyn PredictorEstimator>,
  fit_data_x_type: DenseMatrixType,
  distance_type: DistanceVariantType,
  fit_data_y_type: KNNRegressorPredictOutputType,
}

#[napi]
impl KNNRegressor {
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
    let serialize_data: KNNRegressorSerializeData = decode_from_slice(data.as_ref(), standard())
      .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?
      .0;
    serialize_data.try_into()
  }
}

impl Predictor for KNNRegressor {
  fn predict(&self, x: &DenseMatrix) -> Result<TypedArrayWrapper> {
    self.inner.predict(x)
  }
}

impl Estimator for KNNRegressor {
  fn serialize(&self) -> Result<Vec<u8>> {
    let serialize_data = KNNRegressorSerializeData {
      fit_data_x_type: self.fit_data_x_type,
      fit_data_y_type: self.fit_data_y_type,
      distance_type: self.distance_type,
      knn_regressor: self.inner.serialize()?,
    };
    encode_to_vec(serialize_data, standard())
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }
}
