use napi::{Error, Status};

use super::{serialize_data::SVRSerializeData, variants::*, SVR};
use crate::{
  dense_matrix::DenseMatrixType, deserialize_variant::deserialize_variant,
  traits::PredictorEstimator,
};

impl<'a> TryFrom<SVRSerializeData> for SVR<'a> {
  type Error = Error;

  fn try_from(value: SVRSerializeData) -> std::result::Result<Self, Self::Error> {
    let predictor_estimator: Box<dyn PredictorEstimator> = match value.fit_data_variant_type {
      DenseMatrixType::F64 => Box::new(deserialize_variant::<SVRF64>(&value.svr)?),
      DenseMatrixType::F32 => Box::new(deserialize_variant::<SVRF32>(&value.svr)?),
      DenseMatrixType::U32
      | DenseMatrixType::U16
      | DenseMatrixType::U8
      | DenseMatrixType::I64
      | DenseMatrixType::U64
      | DenseMatrixType::I32 => return Err(Error::new(Status::GenericFailure, "TODO")),
    };
    Ok(SVR {
      inner: predictor_estimator,
      fit_data_variant_type: value.fit_data_variant_type,
    })
  }
}
