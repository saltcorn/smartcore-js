mod builder;
mod deserialize;
mod factory;
mod lib_random_forest_regressor_factory;
mod predict_output_type;
mod predictor_estimator;
mod serialize_data;
mod variants;

use bincode::{config::standard, decode_from_slice, encode_to_vec};
use napi::{bindgen_prelude::Buffer, Error, Result, Status};
use napi_derive::napi;

use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  traits::{Estimator, Predictor, PredictorEstimator},
  typed_array::TypedArrayWrapper,
};
use predict_output_type::RandomForestRegressorPredictOutputType;
use serialize_data::RandomForestRegressorSerializeData;

#[napi(js_name = "RandomForestRegressor")]
#[derive(Debug)]
pub struct RandomForestRegressor {
  pub(super) inner: Box<dyn PredictorEstimator>,
  pub(super) fit_data_variant_type: DenseMatrixType,
  pub(super) predict_output_type: RandomForestRegressorPredictOutputType,
}

#[napi]
impl RandomForestRegressor {
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
    let serialize_data: RandomForestRegressorSerializeData =
      decode_from_slice(data.as_ref(), standard())
        .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?
        .0;
    serialize_data.try_into()
  }
}

impl Predictor for RandomForestRegressor {
  fn predict(&self, x: &DenseMatrix) -> Result<TypedArrayWrapper> {
    self.inner.predict(x)
  }
}

impl Estimator for RandomForestRegressor {
  fn serialize(&self) -> Result<Vec<u8>> {
    let serialize_data = RandomForestRegressorSerializeData {
      fit_data_variant_type: self.fit_data_variant_type,
      predict_output_type: self.predict_output_type,
      random_forest_regressor: self.inner.serialize()?,
    };
    encode_to_vec(serialize_data, standard())
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }
}
