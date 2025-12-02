use napi::{Error, Status};

use super::{
  predict_output_type::LinearRegressionPredictOutputType,
  serialize_data::LinearRegressionSerializeData, variants::*, LinearRegression,
};
use crate::{
  dense_matrix::DenseMatrixType, deserialize_variant::deserialize_variant,
  traits::PredictorEstimator,
};

impl TryFrom<LinearRegressionSerializeData> for LinearRegression {
  type Error = Error;

  fn try_from(value: LinearRegressionSerializeData) -> std::result::Result<Self, Self::Error> {
    let predictor_estimator: Box<dyn PredictorEstimator> =
      match (value.fit_data_variant_type, value.predict_output_type) {
        (DenseMatrixType::F64, LinearRegressionPredictOutputType::F64) => Box::new(
          deserialize_variant::<LinearRegressionF64F64>(&value.linear_regression)?,
        ),
        (DenseMatrixType::F32, LinearRegressionPredictOutputType::F64) => Box::new(
          deserialize_variant::<LinearRegressionF32F64>(&value.linear_regression)?,
        ),
        (DenseMatrixType::F64, LinearRegressionPredictOutputType::F32) => Box::new(
          deserialize_variant::<LinearRegressionF64F32>(&value.linear_regression)?,
        ),
        (DenseMatrixType::F32, LinearRegressionPredictOutputType::F32) => Box::new(
          deserialize_variant::<LinearRegressionF32F32>(&value.linear_regression)?,
        ),
        (DenseMatrixType::F64, LinearRegressionPredictOutputType::I64) => Box::new(
          deserialize_variant::<LinearRegressionF64I64>(&value.linear_regression)?,
        ),
        (DenseMatrixType::F32, LinearRegressionPredictOutputType::I64) => Box::new(
          deserialize_variant::<LinearRegressionF32I64>(&value.linear_regression)?,
        ),
        (DenseMatrixType::F64, LinearRegressionPredictOutputType::U64) => Box::new(
          deserialize_variant::<LinearRegressionF64U64>(&value.linear_regression)?,
        ),
        (DenseMatrixType::F32, LinearRegressionPredictOutputType::U64) => Box::new(
          deserialize_variant::<LinearRegressionF32U64>(&value.linear_regression)?,
        ),
        (DenseMatrixType::F64, LinearRegressionPredictOutputType::I32) => Box::new(
          deserialize_variant::<LinearRegressionF64I32>(&value.linear_regression)?,
        ),
        (DenseMatrixType::F32, LinearRegressionPredictOutputType::I32) => Box::new(
          deserialize_variant::<LinearRegressionF32I32>(&value.linear_regression)?,
        ),
        (DenseMatrixType::U32, _)
        | (DenseMatrixType::U16, _)
        | (DenseMatrixType::U8, _)
        | (DenseMatrixType::I64, _)
        | (DenseMatrixType::U64, _)
        | (DenseMatrixType::I32, _) => {
          return Err(Error::new(
            Status::GenericFailure,
            "LinearRegression supports f64 and f32 fit data types for x.",
          ))
        }
      };
    Ok(LinearRegression {
      inner: predictor_estimator,
      fit_data_variant_type: value.fit_data_variant_type,
      predict_output_type: value.predict_output_type,
    })
  }
}
