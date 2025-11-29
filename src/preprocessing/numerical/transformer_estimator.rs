use bincode::{config::standard, serde::encode_to_vec};
use napi::{Error, Result, Status};
use paste::paste;
use smartcore::preprocessing::numerical::StandardScaler as LibStandardScaler;

use crate::{
  dense_matrix::DenseMatrix,
  traits::{Estimator, Transformer, TransformerEstimator},
};

macro_rules! transformer_estimator_impl {
  (x_type: $x:ty) => {
    paste! {
        pub type [<StandardScaler $x:upper>] = LibStandardScaler<$x>;

        impl Transformer for [<StandardScaler $x:upper>] {
            fn transform(&self, x: &DenseMatrix) -> Result<DenseMatrix> {
                self
                    .transform(x.try_into()?)
                    .map(|r| r.into())
                    .map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
            }
        }

        impl Estimator for [<StandardScaler $x:upper>] {
            fn serialize(&self) -> napi::Result<Vec<u8>> {
                encode_to_vec(self, standard()).map_err(|e| Error::new(Status::GenericFailure, e.to_string()))
            }
        }

        impl TransformerEstimator for [<StandardScaler $x:upper>] {}
    }
  };
}

transformer_estimator_impl! { x_type: f32 }
transformer_estimator_impl! { x_type: f64 }
