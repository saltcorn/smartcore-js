use bincode::{Decode, Encode};

use crate::{
  dense_matrix::DenseMatrixType, distance_type::DistanceVariantType,
  neighbors::knn_regressor::predict_output_type::KNNRegressorPredictOutputType,
};

#[derive(Encode, Decode)]
pub struct KNNRegressorSerializeData {
  pub fit_data_x_type: DenseMatrixType,
  pub fit_data_y_type: KNNRegressorPredictOutputType,
  pub distance_type: DistanceVariantType,
  pub knn_regressor: Vec<u8>,
}
