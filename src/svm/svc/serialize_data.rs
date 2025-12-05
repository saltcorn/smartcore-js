use bincode::{Decode, Encode};

use crate::{dense_matrix::DenseMatrixType, svm::svc::predict_output_type::SVCPredictOutputType};

#[derive(Encode, Decode)]
pub struct SVCSerializeData {
  pub fit_data_x_type: DenseMatrixType,
  pub fit_data_y_type: SVCPredictOutputType,
  pub svc: Vec<u8>,
}
