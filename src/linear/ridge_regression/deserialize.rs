use napi::{Error, Status};

use super::{
  predict_output_type::RidgeRegressionPredictOutputType,
  serialize_data::RidgeRegressionSerializeData, variants::*, RidgeRegression,
};
use crate::{
  dense_matrix::DenseMatrixType, deserialize_variant::deserialize_variant,
  traits::PredictorEstimator,
};

impl TryFrom<RidgeRegressionSerializeData> for RidgeRegression {
  type Error = Error;

  fn try_from(value: RidgeRegressionSerializeData) -> std::result::Result<Self, Self::Error> {
    let predictor_estimator: Box<dyn PredictorEstimator> =
      match (value.fit_data_variant_type, value.predict_output_type) {
        (DenseMatrixType::F64, RidgeRegressionPredictOutputType::I64) => Box::new(
          deserialize_variant::<RidgeRegressionF64I64>(&value.ridge_regression)?,
        ),
        (DenseMatrixType::F32, RidgeRegressionPredictOutputType::I64) => Box::new(
          deserialize_variant::<RidgeRegressionF32I64>(&value.ridge_regression)?,
        ),
        (DenseMatrixType::F64, RidgeRegressionPredictOutputType::U64) => Box::new(
          deserialize_variant::<RidgeRegressionF64U64>(&value.ridge_regression)?,
        ),
        (DenseMatrixType::F32, RidgeRegressionPredictOutputType::U64) => Box::new(
          deserialize_variant::<RidgeRegressionF32U64>(&value.ridge_regression)?,
        ),
        (DenseMatrixType::F64, RidgeRegressionPredictOutputType::I32) => Box::new(
          deserialize_variant::<RidgeRegressionF64I32>(&value.ridge_regression)?,
        ),
        (DenseMatrixType::F32, RidgeRegressionPredictOutputType::I32) => Box::new(
          deserialize_variant::<RidgeRegressionF32I32>(&value.ridge_regression)?,
        ),
        (DenseMatrixType::F32, _)
        | (DenseMatrixType::F64, _)
        | (DenseMatrixType::U32, _)
        | (DenseMatrixType::U16, _)
        | (DenseMatrixType::U8, _)
        | (DenseMatrixType::I64, _)
        | (DenseMatrixType::U64, _)
        | (DenseMatrixType::I32, _) => return Err(Error::new(Status::GenericFailure, "TODO")),
      };
    Ok(RidgeRegression {
      inner: predictor_estimator,
      fit_data_variant_type: value.fit_data_variant_type,
      predict_output_type: value.predict_output_type,
    })
  }
}
