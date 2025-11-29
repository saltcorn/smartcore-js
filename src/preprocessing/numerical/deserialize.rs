use napi::{Error, Status};

use super::{
  serialize_data::StandardScalerSerializeData,
  transformer_estimator::{StandardScalerF32, StandardScalerF64},
  StandardScaler,
};
use crate::{
  dense_matrix::DenseMatrixType, deserialize_variant::deserialize_variant,
  traits::TransformerEstimator,
};

impl TryFrom<StandardScalerSerializeData> for StandardScaler {
  type Error = Error;

  fn try_from(value: StandardScalerSerializeData) -> Result<Self, Self::Error> {
    let transformer_estimator: Box<dyn TransformerEstimator> = match value.fit_data_type {
      DenseMatrixType::F64 => Box::new(deserialize_variant::<StandardScalerF64>(&value.standard_scaler)?),
      DenseMatrixType::F32 => Box::new(deserialize_variant::<StandardScalerF32>(&value.standard_scaler)?),
      DenseMatrixType::U64
      | DenseMatrixType::U32
      | DenseMatrixType::U16
      | DenseMatrixType::U8
      | DenseMatrixType::I64
      | DenseMatrixType::I32 => return Err(Error::new(Status::GenericFailure, "TODO")),
    };
    Ok(StandardScaler {
      inner: transformer_estimator,
      fit_data_type: value.fit_data_type,
    })
  }
}
