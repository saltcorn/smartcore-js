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

predictor_estimator_impl! { DecisionTreeClassifierF64I64 }
predictor_estimator_impl! { DecisionTreeClassifierF64I32 }

predictor_estimator_impl! { DecisionTreeClassifierF32I64 }
predictor_estimator_impl! { DecisionTreeClassifierF32I32 }

predictor_estimator_impl! { DecisionTreeClassifierI64I64 }
predictor_estimator_impl! { DecisionTreeClassifierI64I32 }

predictor_estimator_impl! { DecisionTreeClassifierU64I64 }
predictor_estimator_impl! { DecisionTreeClassifierU64I32 }

predictor_estimator_impl! { DecisionTreeClassifierI32I64 }
predictor_estimator_impl! { DecisionTreeClassifierI32I32 }

predictor_estimator_impl! { DecisionTreeClassifierU32I64 }
predictor_estimator_impl! { DecisionTreeClassifierU32I32 }
