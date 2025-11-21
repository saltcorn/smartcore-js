use napi::{Error, Status};

use super::{
  predict_output_type::ElasticNetPredictOutputType, serialize_data::ElasticNetSerializeData,
  variants::*, ElasticNet,
};
use crate::{
  dense_matrix::DenseMatrixType, deserialize_variant::deserialize_variant,
  traits::PredictorEstimator,
};

impl TryFrom<ElasticNetSerializeData> for ElasticNet {
  type Error = Error;

  fn try_from(value: ElasticNetSerializeData) -> std::result::Result<Self, Self::Error> {
    let predictor_estimator: Box<dyn PredictorEstimator> =
      match (value.fit_data_variant_type, value.predict_output_type) {
        (DenseMatrixType::F64, ElasticNetPredictOutputType::F64) => {
          Box::new(deserialize_variant::<ElasticNetF64F64>(&value.elastic_net)?)
        }
        (DenseMatrixType::F32, ElasticNetPredictOutputType::F64) => {
          Box::new(deserialize_variant::<ElasticNetF32F64>(&value.elastic_net)?)
        }
        (DenseMatrixType::F64, ElasticNetPredictOutputType::F32) => {
          Box::new(deserialize_variant::<ElasticNetF64F32>(&value.elastic_net)?)
        }
        (DenseMatrixType::F32, ElasticNetPredictOutputType::F32) => {
          Box::new(deserialize_variant::<ElasticNetF32F32>(&value.elastic_net)?)
        }
        (DenseMatrixType::F64, ElasticNetPredictOutputType::I64) => {
          Box::new(deserialize_variant::<ElasticNetF64I64>(&value.elastic_net)?)
        }
        (DenseMatrixType::F32, ElasticNetPredictOutputType::I64) => {
          Box::new(deserialize_variant::<ElasticNetF32I64>(&value.elastic_net)?)
        }
        (DenseMatrixType::F64, ElasticNetPredictOutputType::U64) => {
          Box::new(deserialize_variant::<ElasticNetF64U64>(&value.elastic_net)?)
        }
        (DenseMatrixType::F32, ElasticNetPredictOutputType::U64) => {
          Box::new(deserialize_variant::<ElasticNetF32U64>(&value.elastic_net)?)
        }
        (DenseMatrixType::F64, ElasticNetPredictOutputType::I32) => {
          Box::new(deserialize_variant::<ElasticNetF64I32>(&value.elastic_net)?)
        }
        (DenseMatrixType::F32, ElasticNetPredictOutputType::I32) => {
          Box::new(deserialize_variant::<ElasticNetF32I32>(&value.elastic_net)?)
        }
        (DenseMatrixType::U32, _)
        | (DenseMatrixType::U16, _)
        | (DenseMatrixType::U8, _)
        | (DenseMatrixType::I64, _)
        | (DenseMatrixType::U64, _)
        | (DenseMatrixType::I32, _) => {
          return Err(Error::new(
            Status::GenericFailure,
            "ElasticNet supports f64 and f32 fit data types for x.",
          ))
        }
      };
    Ok(ElasticNet {
      inner: predictor_estimator,
      fit_data_variant_type: value.fit_data_variant_type,
      predict_output_type: value.predict_output_type,
    })
  }
}
