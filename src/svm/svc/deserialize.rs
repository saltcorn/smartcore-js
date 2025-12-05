use napi::{Error, Status};

use super::{serialize_data::SVCSerializeData, variants::*, SVC};
use crate::{
  dense_matrix::DenseMatrixType, deserialize_variant::deserialize_variant,
  svm::svc::predict_output_type::SVCPredictOutputType, traits::PredictorEstimator,
};

impl<'a> TryFrom<SVCSerializeData> for SVC<'a> {
  type Error = Error;

  fn try_from(value: SVCSerializeData) -> std::result::Result<Self, Self::Error> {
    let predictor_estimator: Box<dyn PredictorEstimator> =
      match (value.fit_data_x_type, value.fit_data_y_type) {
        (DenseMatrixType::F64, SVCPredictOutputType::I64) => {
          Box::new(deserialize_variant::<SVCF64I64>(&value.svc)?)
        }
        (DenseMatrixType::F32, SVCPredictOutputType::I64) => {
          Box::new(deserialize_variant::<SVCF32I64>(&value.svc)?)
        }
        (DenseMatrixType::F64, SVCPredictOutputType::I32) => {
          Box::new(deserialize_variant::<SVCF64I32>(&value.svc)?)
        }
        (DenseMatrixType::F32, SVCPredictOutputType::I32) => {
          Box::new(deserialize_variant::<SVCF32I32>(&value.svc)?)
        }
        (DenseMatrixType::U32, _)
        | (DenseMatrixType::U16, _)
        | (DenseMatrixType::U8, _)
        | (DenseMatrixType::I64, _)
        | (DenseMatrixType::U64, _)
        | (DenseMatrixType::I32, _) => return Err(Error::new(Status::GenericFailure, "TODO")),
      };
    Ok(SVC {
      inner: predictor_estimator,
      fit_data_x_type: value.fit_data_x_type,
      fit_data_y_type: value.fit_data_y_type,
    })
  }
}
