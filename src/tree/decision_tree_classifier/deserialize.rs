use napi::{Error, Status};

use super::{
  predict_output_type::DecisionTreeClassifierPredictOutputType,
  serialize_data::DecisionTreeClassifierSerializeData, variants::*, DecisionTreeClassifier,
};
use crate::{
  dense_matrix::DenseMatrixType, deserialize_variant::deserialize_variant,
  traits::PredictorEstimator,
};

impl TryFrom<DecisionTreeClassifierSerializeData> for DecisionTreeClassifier {
  type Error = Error;

  fn try_from(
    value: DecisionTreeClassifierSerializeData,
  ) -> std::result::Result<Self, Self::Error> {
    let predictor_estimator: Box<dyn PredictorEstimator> =
      match (value.fit_data_variant_type, value.predict_output_type) {
        (DenseMatrixType::F64, DecisionTreeClassifierPredictOutputType::I64) => Box::new(
          deserialize_variant::<DecisionTreeClassifierF64I64>(&value.decision_tree_classifier)?,
        ),
        (DenseMatrixType::F64, DecisionTreeClassifierPredictOutputType::I32) => Box::new(
          deserialize_variant::<DecisionTreeClassifierF64I32>(&value.decision_tree_classifier)?,
        ),
        (DenseMatrixType::F32, DecisionTreeClassifierPredictOutputType::I64) => Box::new(
          deserialize_variant::<DecisionTreeClassifierF32I64>(&value.decision_tree_classifier)?,
        ),
        (DenseMatrixType::F32, DecisionTreeClassifierPredictOutputType::I32) => Box::new(
          deserialize_variant::<DecisionTreeClassifierF32I32>(&value.decision_tree_classifier)?,
        ),
        (DenseMatrixType::I64, DecisionTreeClassifierPredictOutputType::I64) => Box::new(
          deserialize_variant::<DecisionTreeClassifierI64I64>(&value.decision_tree_classifier)?,
        ),
        (DenseMatrixType::I64, DecisionTreeClassifierPredictOutputType::I32) => Box::new(
          deserialize_variant::<DecisionTreeClassifierI64I32>(&value.decision_tree_classifier)?,
        ),
        (DenseMatrixType::U64, DecisionTreeClassifierPredictOutputType::I64) => Box::new(
          deserialize_variant::<DecisionTreeClassifierU64I64>(&value.decision_tree_classifier)?,
        ),
        (DenseMatrixType::U64, DecisionTreeClassifierPredictOutputType::I32) => Box::new(
          deserialize_variant::<DecisionTreeClassifierU64I32>(&value.decision_tree_classifier)?,
        ),
        (DenseMatrixType::I32, DecisionTreeClassifierPredictOutputType::I64) => Box::new(
          deserialize_variant::<DecisionTreeClassifierI32I64>(&value.decision_tree_classifier)?,
        ),
        (DenseMatrixType::I32, DecisionTreeClassifierPredictOutputType::I32) => Box::new(
          deserialize_variant::<DecisionTreeClassifierI32I32>(&value.decision_tree_classifier)?,
        ),
        (DenseMatrixType::U32, DecisionTreeClassifierPredictOutputType::I64) => Box::new(
          deserialize_variant::<DecisionTreeClassifierU32I64>(&value.decision_tree_classifier)?,
        ),
        (DenseMatrixType::U32, DecisionTreeClassifierPredictOutputType::I32) => Box::new(
          deserialize_variant::<DecisionTreeClassifierU32I32>(&value.decision_tree_classifier)?,
        ),
        (DenseMatrixType::U16, _) | (DenseMatrixType::U8, _) => {
          return Err(Error::new(
            Status::GenericFailure,
            "DecisionTreeClassifier supports f64 and f32 fit data types for x.",
          ))
        }
      };
    Ok(DecisionTreeClassifier {
      inner: predictor_estimator,
      fit_data_variant_type: value.fit_data_variant_type,
      predict_output_type: value.predict_output_type,
    })
  }
}
