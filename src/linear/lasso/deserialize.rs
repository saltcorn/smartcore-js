use napi::{Error, Status};

use super::{
  predict_output_type::LassoPredictOutputType, serialize_data::LassoSerializeData, variants::*,
  Lasso,
};
use crate::{
  dense_matrix::DenseMatrixType, deserialize_variant::deserialize_variant,
  traits::PredictorEstimator,
};

impl TryFrom<LassoSerializeData> for Lasso {
  type Error = Error;

  fn try_from(value: LassoSerializeData) -> std::result::Result<Self, Self::Error> {
    let predictor_estimator: Box<dyn PredictorEstimator> =
      match (value.fit_data_variant_type, value.predict_output_type) {
        (DenseMatrixType::F64, LassoPredictOutputType::F64) => {
          Box::new(deserialize_variant::<LassoF64F64>(&value.lasso)?)
        }
        (DenseMatrixType::F32, LassoPredictOutputType::F64) => {
          Box::new(deserialize_variant::<LassoF32F64>(&value.lasso)?)
        }
        (DenseMatrixType::F64, LassoPredictOutputType::F32) => {
          Box::new(deserialize_variant::<LassoF64F32>(&value.lasso)?)
        }
        (DenseMatrixType::F32, LassoPredictOutputType::F32) => {
          Box::new(deserialize_variant::<LassoF32F32>(&value.lasso)?)
        }
        (DenseMatrixType::F64, LassoPredictOutputType::I64) => {
          Box::new(deserialize_variant::<LassoF64I64>(&value.lasso)?)
        }
        (DenseMatrixType::F32, LassoPredictOutputType::I64) => {
          Box::new(deserialize_variant::<LassoF32I64>(&value.lasso)?)
        }
        (DenseMatrixType::F64, LassoPredictOutputType::U64) => {
          Box::new(deserialize_variant::<LassoF64U64>(&value.lasso)?)
        }
        (DenseMatrixType::F32, LassoPredictOutputType::U64) => {
          Box::new(deserialize_variant::<LassoF32U64>(&value.lasso)?)
        }
        (DenseMatrixType::F64, LassoPredictOutputType::I32) => {
          Box::new(deserialize_variant::<LassoF64I32>(&value.lasso)?)
        }
        (DenseMatrixType::F32, LassoPredictOutputType::I32) => {
          Box::new(deserialize_variant::<LassoF32I32>(&value.lasso)?)
        }
        (DenseMatrixType::U32, _)
        | (DenseMatrixType::U16, _)
        | (DenseMatrixType::U8, _)
        | (DenseMatrixType::I64, _)
        | (DenseMatrixType::U64, _)
        | (DenseMatrixType::I32, _) => {
          return Err(Error::new(
            Status::GenericFailure,
            "Lasso supports f64 and f32 fit data types for x.",
          ))
        }
      };
    Ok(Lasso {
      inner: predictor_estimator,
      fit_data_variant_type: value.fit_data_variant_type,
      predict_output_type: value.predict_output_type,
    })
  }
}
