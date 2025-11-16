use bincode::{config::standard, encode_to_vec};
use napi::{Error, Result, Status};
use napi_derive::napi;

use super::{predict_output_type::PredictOutputType, serialize_data::KMeansSerializeData};
use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixTypeVariantName},
  predict_output::PredictOutput,
  traits::{Estimator, Predictor, PredictorEstimator},
};

#[napi(js_name = "KMeansV2")]
#[derive(Debug)]
pub struct KMeansV2 {
  pub(super) inner: Box<dyn PredictorEstimator>,
  pub(super) fit_data_variant_type: DenseMatrixTypeVariantName,
  pub(super) predict_output_type: PredictOutputType,
}

#[napi]
impl KMeansV2 {}

impl Predictor for KMeansV2 {
  fn predict(&self, x: &DenseMatrix) -> Result<PredictOutput> {
    self.inner.predict(x)
  }
}

impl Estimator for KMeansV2 {
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
