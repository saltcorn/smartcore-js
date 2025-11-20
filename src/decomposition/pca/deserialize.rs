use napi::{Error, Status};

use super::{
  serialize_data::PCASerializeData,
  transformer_estimator::{PCAF32, PCAF64},
};
use crate::{
  decomposition::pca::v2::PCAV2, dense_matrix::DenseMatrixType,
  deserialize_variant::deserialize_variant, traits::TransformerEstimator,
};

impl TryFrom<PCASerializeData> for PCAV2 {
  type Error = Error;

  fn try_from(value: PCASerializeData) -> Result<Self, Self::Error> {
    let transformer_estimator: Box<dyn TransformerEstimator> = match value.fit_data_type {
      DenseMatrixType::F64 => Box::new(deserialize_variant::<PCAF64>(&value.pca)?),
      DenseMatrixType::F32 => Box::new(deserialize_variant::<PCAF32>(&value.pca)?),
      DenseMatrixType::U64
      | DenseMatrixType::U32
      | DenseMatrixType::U16
      | DenseMatrixType::U8
      | DenseMatrixType::I64
      | DenseMatrixType::I32 => return Err(Error::new(Status::GenericFailure, "TODO")),
    };
    Ok(PCAV2 {
      inner: transformer_estimator,
      fit_data_type: value.fit_data_type,
    })
  }
}
