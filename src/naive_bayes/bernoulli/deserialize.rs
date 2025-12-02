use napi::Error;

use super::{serialize_data::BernoulliNBSerializeData, variants::*, BernoulliNB};
use crate::{deserialize_variant::deserialize_variant, traits::PredictorEstimator};

impl TryFrom<BernoulliNBSerializeData> for BernoulliNB {
  type Error = Error;

  fn try_from(value: BernoulliNBSerializeData) -> std::result::Result<Self, Self::Error> {
    let predictor_estimator: Box<dyn PredictorEstimator> =
      match (value.fit_data_variant_type, value.predict_output_type) {
        (
          crate::dense_matrix::DenseMatrixType::F64,
          super::predict_output_type::BernoulliNBPredictOutputType::U32,
        ) => Box::new(deserialize_variant::<BernoulliNBF64U32>(
          &value.bernoulli_nb,
        )?),
        (
          crate::dense_matrix::DenseMatrixType::F64,
          super::predict_output_type::BernoulliNBPredictOutputType::U64,
        ) => Box::new(deserialize_variant::<BernoulliNBF64U64>(
          &value.bernoulli_nb,
        )?),

        (
          crate::dense_matrix::DenseMatrixType::F32,
          super::predict_output_type::BernoulliNBPredictOutputType::U32,
        ) => Box::new(deserialize_variant::<BernoulliNBF32U32>(
          &value.bernoulli_nb,
        )?),
        (
          crate::dense_matrix::DenseMatrixType::F32,
          super::predict_output_type::BernoulliNBPredictOutputType::U64,
        ) => Box::new(deserialize_variant::<BernoulliNBF32U64>(
          &value.bernoulli_nb,
        )?),

        (
          crate::dense_matrix::DenseMatrixType::I64,
          super::predict_output_type::BernoulliNBPredictOutputType::U32,
        ) => Box::new(deserialize_variant::<BernoulliNBI64U32>(
          &value.bernoulli_nb,
        )?),
        (
          crate::dense_matrix::DenseMatrixType::I64,
          super::predict_output_type::BernoulliNBPredictOutputType::U64,
        ) => Box::new(deserialize_variant::<BernoulliNBI64U64>(
          &value.bernoulli_nb,
        )?),

        (
          crate::dense_matrix::DenseMatrixType::U64,
          super::predict_output_type::BernoulliNBPredictOutputType::U32,
        ) => Box::new(deserialize_variant::<BernoulliNBU64U32>(
          &value.bernoulli_nb,
        )?),
        (
          crate::dense_matrix::DenseMatrixType::U64,
          super::predict_output_type::BernoulliNBPredictOutputType::U64,
        ) => Box::new(deserialize_variant::<BernoulliNBU64U64>(
          &value.bernoulli_nb,
        )?),

        (
          crate::dense_matrix::DenseMatrixType::I32,
          super::predict_output_type::BernoulliNBPredictOutputType::U32,
        ) => Box::new(deserialize_variant::<BernoulliNBI32U32>(
          &value.bernoulli_nb,
        )?),
        (
          crate::dense_matrix::DenseMatrixType::I32,
          super::predict_output_type::BernoulliNBPredictOutputType::U64,
        ) => Box::new(deserialize_variant::<BernoulliNBI32U64>(
          &value.bernoulli_nb,
        )?),

        (
          crate::dense_matrix::DenseMatrixType::U32,
          super::predict_output_type::BernoulliNBPredictOutputType::U32,
        ) => Box::new(deserialize_variant::<BernoulliNBU32U32>(
          &value.bernoulli_nb,
        )?),
        (
          crate::dense_matrix::DenseMatrixType::U32,
          super::predict_output_type::BernoulliNBPredictOutputType::U64,
        ) => Box::new(deserialize_variant::<BernoulliNBU32U64>(
          &value.bernoulli_nb,
        )?),

        (
          crate::dense_matrix::DenseMatrixType::U16,
          super::predict_output_type::BernoulliNBPredictOutputType::U32,
        ) => Box::new(deserialize_variant::<BernoulliNBU16U32>(
          &value.bernoulli_nb,
        )?),
        (
          crate::dense_matrix::DenseMatrixType::U16,
          super::predict_output_type::BernoulliNBPredictOutputType::U64,
        ) => Box::new(deserialize_variant::<BernoulliNBU16U64>(
          &value.bernoulli_nb,
        )?),

        (
          crate::dense_matrix::DenseMatrixType::U8,
          super::predict_output_type::BernoulliNBPredictOutputType::U32,
        ) => Box::new(deserialize_variant::<BernoulliNBU8U32>(
          &value.bernoulli_nb,
        )?),
        (
          crate::dense_matrix::DenseMatrixType::U8,
          super::predict_output_type::BernoulliNBPredictOutputType::U64,
        ) => Box::new(deserialize_variant::<BernoulliNBU8U64>(
          &value.bernoulli_nb,
        )?),
      };
    Ok(BernoulliNB {
      inner: predictor_estimator,
      fit_data_variant_type: value.fit_data_variant_type,
      predict_output_type: value.predict_output_type,
    })
  }
}
