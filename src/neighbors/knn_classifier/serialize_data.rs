use bincode::{Decode, Encode};

use super::distance_type::DistanceVariantType;
use crate::{
  dense_matrix::DenseMatrixType,
  neighbors::knn_classifier::predict_output_type::KNNClassifierPredictOutputType,
};

#[derive(Encode, Decode)]
pub struct KNNClassifierSerializeData {
  pub fit_data_x_type: DenseMatrixType,
  pub fit_data_y_type: KNNClassifierPredictOutputType,
  pub distance_type: DistanceVariantType,
  pub knn_classifier: Vec<u8>,
}
