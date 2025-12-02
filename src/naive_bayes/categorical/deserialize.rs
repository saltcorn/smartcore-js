use napi::{Error, Status};

use super::{serialize_data::CategoricalNBSerializeData, variants::*, CategoricalNB};
use crate::{
  dense_matrix::DenseMatrixType, deserialize_variant::deserialize_variant,
  traits::PredictorEstimator,
};

impl TryFrom<CategoricalNBSerializeData> for CategoricalNB {
  type Error = Error;

  fn try_from(value: CategoricalNBSerializeData) -> std::result::Result<Self, Self::Error> {
    let predictor_estimator: Box<dyn PredictorEstimator> = match value.fit_data_variant_type {
      DenseMatrixType::U64 => Box::new(deserialize_variant::<CategoricalNBU64>(
        &value.categorical_nb,
      )?),
      DenseMatrixType::U32 => Box::new(deserialize_variant::<CategoricalNBU32>(
        &value.categorical_nb,
      )?),
      DenseMatrixType::U16 => Box::new(deserialize_variant::<CategoricalNBU16>(
        &value.categorical_nb,
      )?),
      DenseMatrixType::U8 => Box::new(deserialize_variant::<CategoricalNBU8>(
        &value.categorical_nb,
      )?),
      DenseMatrixType::F32 | DenseMatrixType::F64 | DenseMatrixType::I32 | DenseMatrixType::I64 => {
        return Err(Error::new(Status::GenericFailure, "TODO"))
      }
    };
    Ok(CategoricalNB {
      inner: predictor_estimator,
      fit_data_variant_type: value.fit_data_variant_type,
    })
  }
}
