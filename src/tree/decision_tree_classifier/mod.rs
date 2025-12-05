mod builder;
mod deserialize;
mod factory;
mod lib_decision_tree_classifier_factory;
mod predict_output_type;
mod predictor_estimator;
mod serialize_data;
mod variants;

use bincode::{config::standard, decode_from_slice, encode_to_vec};
use napi::{bindgen_prelude::Buffer, Error, Result, Status};
use napi_derive::napi;
use smartcore::tree::decision_tree_classifier::SplitCriterion as LibSplitCriterion;

use crate::{
  dense_matrix::{DenseMatrix, DenseMatrixType},
  traits::{Estimator, Predictor, PredictorEstimator},
  typed_array::TypedArrayWrapper,
};
use predict_output_type::DecisionTreeClassifierPredictOutputType;
use serialize_data::DecisionTreeClassifierSerializeData;

#[napi]
#[derive(Debug, Clone, Copy, Eq, PartialEq)]
pub enum SplitCriterion {
  Gini,
  Entropy,
  ClassificationError,
}

impl From<SplitCriterion> for LibSplitCriterion {
  fn from(value: SplitCriterion) -> Self {
    match value {
      SplitCriterion::Gini => LibSplitCriterion::Gini,
      SplitCriterion::Entropy => LibSplitCriterion::Entropy,
      SplitCriterion::ClassificationError => LibSplitCriterion::ClassificationError,
    }
  }
}

#[napi(js_name = "DecisionTreeClassifier")]
#[derive(Debug)]
pub struct DecisionTreeClassifier {
  pub(super) inner: Box<dyn PredictorEstimator>,
  pub(super) fit_data_variant_type: DenseMatrixType,
  pub(super) predict_output_type: DecisionTreeClassifierPredictOutputType,
}

#[napi]
impl DecisionTreeClassifier {
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
    let serialize_data: DecisionTreeClassifierSerializeData =
      decode_from_slice(data.as_ref(), standard())
        .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?
        .0;
    serialize_data.try_into()
  }
}

impl Predictor for DecisionTreeClassifier {
  fn predict(&self, x: &DenseMatrix) -> Result<TypedArrayWrapper> {
    self.inner.predict(x)
  }
}

impl Estimator for DecisionTreeClassifier {
  fn serialize(&self) -> Result<Vec<u8>> {
    let serialize_data = DecisionTreeClassifierSerializeData {
      fit_data_variant_type: self.fit_data_variant_type,
      predict_output_type: self.predict_output_type,
      decision_tree_classifier: self.inner.serialize()?,
    };
    encode_to_vec(serialize_data, standard())
      .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
  }
}
