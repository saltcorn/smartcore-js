use bincode::{Decode, Encode};

use super::predict_output_type::ElasticNetPredictOutputType;
use crate::dense_matrix::DenseMatrixType;

#[derive(Encode, Decode)]
pub struct ElasticNetSerializeData {
  pub fit_data_variant_type: DenseMatrixType,
  pub predict_output_type: ElasticNetPredictOutputType,
  pub elastic_net: Vec<u8>,
}
