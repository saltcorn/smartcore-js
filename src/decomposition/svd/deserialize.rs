use napi::{Error, Status};

use super::{
  serialize_data::SVDSerializeData,
  transformer_estimator::{SVDF32, SVDF64},
  SVD,
};
use crate::{
  dense_matrix::DenseMatrixType, deserialize_variant::deserialize_variant,
  traits::TransformerEstimator,
};

impl TryFrom<SVDSerializeData> for SVD {
  type Error = Error;

  fn try_from(value: SVDSerializeData) -> Result<Self, Self::Error> {
    let transformer_estimator: Box<dyn TransformerEstimator> = match value.fit_data_type {
      DenseMatrixType::F64 => Box::new(deserialize_variant::<SVDF64>(&value.svd)?),
      DenseMatrixType::F32 => Box::new(deserialize_variant::<SVDF32>(&value.svd)?),
      DenseMatrixType::U64
      | DenseMatrixType::U32
      | DenseMatrixType::U16
      | DenseMatrixType::U8
      | DenseMatrixType::I64
      | DenseMatrixType::I32 => return Err(Error::new(Status::GenericFailure, "TODO")),
    };
    Ok(SVD {
      inner: transformer_estimator,
      fit_data_type: value.fit_data_type,
    })
  }
}
