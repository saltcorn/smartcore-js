use crate::{dense_matrix::DenseMatrix, predict_output::PredictOutput};
use napi::bindgen_prelude::Result;

pub trait Estimator {
  fn serialize(&self) -> Result<Vec<u8>>;
}

pub trait Predictor: std::fmt::Debug {
  fn predict(&self, x: &DenseMatrix) -> Result<PredictOutput>;
}

pub trait Transformer: std::fmt::Debug {
  fn transform(&self, x: &DenseMatrix) -> Result<DenseMatrix>;
}

pub trait PredictorEstimator: Estimator + Predictor {}

pub trait TransformerEstimator: Estimator + Transformer {}
