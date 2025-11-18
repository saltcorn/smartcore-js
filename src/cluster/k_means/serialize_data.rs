use bincode::{Decode, Encode};

use super::predict_output_type::PredictOutputType;
use crate::dense_matrix::DenseMatrixType;

#[derive(Encode, Decode)]
pub struct KMeansSerializeData {
  pub fit_data_variant_type: DenseMatrixType,
  pub predict_output_type: PredictOutputType,
  pub kmeans: Vec<u8>,
}
