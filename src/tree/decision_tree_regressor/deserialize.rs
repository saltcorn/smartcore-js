use napi::{Error, Status};

use super::{
  predict_output_type::DecisionTreeRegressorPredictOutputType,
  serialize_data::DecisionTreeRegressorSerializeData, variants::*, DecisionTreeRegressor,
};
use crate::{
  dense_matrix::DenseMatrixType, deserialize_variant::deserialize_variant,
  traits::PredictorEstimator,
};

impl TryFrom<DecisionTreeRegressorSerializeData> for DecisionTreeRegressor {
  type Error = Error;

  fn try_from(value: DecisionTreeRegressorSerializeData) -> std::result::Result<Self, Self::Error> {
    let predictor_estimator: Box<dyn PredictorEstimator> =
      match (value.fit_data_variant_type, value.predict_output_type) {
        (DenseMatrixType::F64, DecisionTreeRegressorPredictOutputType::I64) => Box::new(
          deserialize_variant::<DecisionTreeRegressorF64I64>(&value.decision_tree_regressor)?,
        ),
        (DenseMatrixType::F64, DecisionTreeRegressorPredictOutputType::I32) => Box::new(
          deserialize_variant::<DecisionTreeRegressorF64I32>(&value.decision_tree_regressor)?,
        ),
        (DenseMatrixType::F32, DecisionTreeRegressorPredictOutputType::I64) => Box::new(
          deserialize_variant::<DecisionTreeRegressorF32I64>(&value.decision_tree_regressor)?,
        ),
        (DenseMatrixType::F32, DecisionTreeRegressorPredictOutputType::I32) => Box::new(
          deserialize_variant::<DecisionTreeRegressorF32I32>(&value.decision_tree_regressor)?,
        ),
        (DenseMatrixType::I64, DecisionTreeRegressorPredictOutputType::I64) => Box::new(
          deserialize_variant::<DecisionTreeRegressorI64I64>(&value.decision_tree_regressor)?,
        ),
        (DenseMatrixType::I64, DecisionTreeRegressorPredictOutputType::I32) => Box::new(
          deserialize_variant::<DecisionTreeRegressorI64I32>(&value.decision_tree_regressor)?,
        ),
        (DenseMatrixType::U64, DecisionTreeRegressorPredictOutputType::I64) => Box::new(
          deserialize_variant::<DecisionTreeRegressorU64I64>(&value.decision_tree_regressor)?,
        ),
        (DenseMatrixType::U64, DecisionTreeRegressorPredictOutputType::I32) => Box::new(
          deserialize_variant::<DecisionTreeRegressorU64I32>(&value.decision_tree_regressor)?,
        ),
        (DenseMatrixType::I32, DecisionTreeRegressorPredictOutputType::I64) => Box::new(
          deserialize_variant::<DecisionTreeRegressorI32I64>(&value.decision_tree_regressor)?,
        ),
        (DenseMatrixType::I32, DecisionTreeRegressorPredictOutputType::I32) => Box::new(
          deserialize_variant::<DecisionTreeRegressorI32I32>(&value.decision_tree_regressor)?,
        ),
        (DenseMatrixType::U32, DecisionTreeRegressorPredictOutputType::I64) => Box::new(
          deserialize_variant::<DecisionTreeRegressorU32I64>(&value.decision_tree_regressor)?,
        ),
        (DenseMatrixType::U32, DecisionTreeRegressorPredictOutputType::I32) => Box::new(
          deserialize_variant::<DecisionTreeRegressorU32I32>(&value.decision_tree_regressor)?,
        ),
        (DenseMatrixType::U16, _) | (DenseMatrixType::U8, _) => {
          return Err(Error::new(
            Status::GenericFailure,
            "DecisionTreeRegressor supports f64 and f32 fit data types for x.",
          ))
        }
      };
    Ok(DecisionTreeRegressor {
      inner: predictor_estimator,
      fit_data_variant_type: value.fit_data_variant_type,
      predict_output_type: value.predict_output_type,
    })
  }
}
