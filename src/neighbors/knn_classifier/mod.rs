mod builder;
mod deserialize;
mod distance_type;
mod factory;
mod knn_classifier_parameters;
mod lib_knn_classifier_factory;
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
  traits::{Estimator, Predictor, PredictorEstimator},
  typed_array::TypedArrayWrapper,
};

use distance_type::DistanceVariantType;
use predict_output_type::KNNClassifierPredictOutputType;
use serialize_data::KNNClassifierSerializeData;

#[napi(js_name = "KNNClassifier")]
#[derive(Debug)]
pub struct KNNClassifier {
  inner: Box<dyn PredictorEstimator>,
  fit_data_x_type: DenseMatrixType,
  distance_type: DistanceVariantType,
  fit_data_y_type: KNNClassifierPredictOutputType,
}

#[napi]
impl KNNClassifier {
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
    let serialize_data: KNNClassifierSerializeData = decode_from_slice(data.as_ref(), standard())
      .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?
      .0;
    serialize_data.try_into()
  }
}

impl Predictor for KNNClassifier {
  fn predict(&self, x: &DenseMatrix) -> Result<TypedArrayWrapper> {
    self.inner.predict(x)
  }
}

impl Estimator for KNNClassifier {
  fn serialize(&self) -> Result<Vec<u8>> {
    let serialize_data = KNNClassifierSerializeData {
      fit_data_x_type: self.fit_data_x_type,
      fit_data_y_type: self.fit_data_y_type,
      distance_type: self.distance_type,
      knn_classifier: self.inner.serialize()?,
    };
    encode_to_vec(serialize_data, standard())
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }
}
