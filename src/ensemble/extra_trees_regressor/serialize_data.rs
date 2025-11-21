use bincode::{Decode, Encode};

use super::predict_output_type::ExtraTreesRegressorPredictOutputType;
use crate::dense_matrix::DenseMatrixType;

#[derive(Encode, Decode)]
pub struct ExtraTreesRegressorSerializeData {
  pub fit_data_variant_type: DenseMatrixType,
  pub predict_output_type: ExtraTreesRegressorPredictOutputType,
  pub extra_trees_regressor: Vec<u8>,
}
