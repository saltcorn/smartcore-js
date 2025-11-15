use bincode::{config::standard, serde::encode_to_vec};
use napi::bindgen_prelude::*;
use paste::paste;

use super::{dense_matrix::DenseMatrix, variants::*};

pub trait Estimator {
  fn serialize(&self) -> Result<Vec<u8>>;
}

pub trait Predictor: std::fmt::Debug {
  fn predict(&self, x: &DenseMatrix) -> Result<Int32Array>;
}

pub trait PredictorEstimator: Estimator + Predictor {}

macro_rules! predictor_estimator_impl {
  ($variant:ty) => {
    paste! {
        impl Predictor for $variant {
            fn predict(&self, x: &DenseMatrix) -> Result<Int32Array> {
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

predictor_estimator_impl! { DBSCANF32Euclidian }
predictor_estimator_impl! { DBSCANF32Mahalanobis }
predictor_estimator_impl! { DBSCANF32Manhattan }
predictor_estimator_impl! { DBSCANF32Minkowski }

predictor_estimator_impl! { DBSCANF64Euclidian }
predictor_estimator_impl! { DBSCANF64Mahalanobis }
predictor_estimator_impl! { DBSCANF64Manhattan }
predictor_estimator_impl! { DBSCANF64Minkowski }

predictor_estimator_impl! { DBSCANI32Euclidian }
predictor_estimator_impl! { DBSCANI32Hamming }
predictor_estimator_impl! { DBSCANI32Manhattan }
predictor_estimator_impl! { DBSCANI32Minkowski }

predictor_estimator_impl! { DBSCANI64Euclidian }
predictor_estimator_impl! { DBSCANI64Manhattan }
predictor_estimator_impl! { DBSCANI64Minkowski }

predictor_estimator_impl! { DBSCANU16Euclidian }
predictor_estimator_impl! { DBSCANU16Hamming }

predictor_estimator_impl! { DBSCANU32Euclidian }
predictor_estimator_impl! { DBSCANU32Manhattan }

predictor_estimator_impl! { DBSCANU64Euclidian }
predictor_estimator_impl! { DBSCANU64Manhattan }

predictor_estimator_impl! { DBSCANU8Euclidian }
predictor_estimator_impl! { DBSCANU8Hamming }
