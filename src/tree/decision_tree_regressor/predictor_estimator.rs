use bincode::{config::standard, serde::encode_to_vec};
use napi::{Error, Result, Status};
use paste::paste;

use super::variants::*;
use crate::{
  dense_matrix::DenseMatrix,
  traits::{Estimator, Predictor, PredictorEstimator},
  typed_array::TypedArrayWrapper,
};

macro_rules! predictor_estimator_impl {
  ($variant:ty) => {
    paste! {
        impl Predictor for $variant {
            fn predict(&self, x: &DenseMatrix) -> Result<TypedArrayWrapper> {
                self
                    .predict(x.try_into()?)
                    .map(|e| e.into())
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
            }
        }

        impl Estimator for $variant {
            fn serialize(&self) -> Result<Vec<u8>> {
                encode_to_vec(&self, standard()).map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
            }
        }

        impl PredictorEstimator for $variant {}
    }
  };
}

predictor_estimator_impl! { DecisionTreeRegressorF64I64 }
predictor_estimator_impl! { DecisionTreeRegressorF64I32 }

predictor_estimator_impl! { DecisionTreeRegressorF32I64 }
predictor_estimator_impl! { DecisionTreeRegressorF32I32 }

predictor_estimator_impl! { DecisionTreeRegressorI64I64 }
predictor_estimator_impl! { DecisionTreeRegressorI64I32 }

predictor_estimator_impl! { DecisionTreeRegressorU64I64 }
predictor_estimator_impl! { DecisionTreeRegressorU64I32 }

predictor_estimator_impl! { DecisionTreeRegressorI32I64 }
predictor_estimator_impl! { DecisionTreeRegressorI32I32 }

predictor_estimator_impl! { DecisionTreeRegressorU32I64 }
predictor_estimator_impl! { DecisionTreeRegressorU32I32 }
