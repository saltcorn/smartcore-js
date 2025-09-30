mod parameters;

use std::ops::Deref;

use bincode::{
  config::standard,
  serde::{decode_from_slice, encode_to_vec},
};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix,
  tree::decision_tree_regressor::DecisionTreeRegressor as LibDecisionTreeRegressor,
};

use crate::linalg::basic::matrix::DenseMatrixI64;
use parameters::DecisionTreeRegressorParameters;

macro_rules! decision_tree_regressor_nb_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name=""[<DecisionTreeRegressor $x:upper $y:upper>]"")]
        #[derive(Debug)]
        pub struct [<DecisionTreeRegressor $x:upper $y:upper>] {
            inner: LibDecisionTreeRegressor<$x, $y, DenseMatrix<$x>, Vec<$y>>,
        }

        #[napi]
        impl [<DecisionTreeRegressor $x:upper $y:upper>] {
            #[napi(factory)]
            pub fn fit(x: &$xs, y: $ys, parameters: &DecisionTreeRegressorParameters) -> Result<Self> {
                let inner = LibDecisionTreeRegressor::fit(
                    x as &DenseMatrix<$x>,
                    &y.to_vec(),
                    parameters.owned_inner(),
                )
                .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Self { inner })
            }

            #[napi]
            pub fn predict(&self, x: &$xs) -> Result<$ys> {
                let prediction_result = self
                .inner
                .predict(x as &DenseMatrix<$x>)
                .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok($ys::new(prediction_result))
            }

            #[napi]
            pub fn serialize(&self) -> Result<Buffer> {
                let encoded = encode_to_vec(&self.inner, standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Buffer::from(encoded))
            }

            #[napi(factory)]
            pub fn deserialize(data: Buffer) -> Result<Self> {
                let inner = decode_from_slice::<LibDecisionTreeRegressor<$x, $y, DenseMatrix<$x>, Vec<$y>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl Deref for [<DecisionTreeRegressor $x:upper $y:upper>] {
            type Target = LibDecisionTreeRegressor<$x, $y, DenseMatrix<$x>, Vec<$y>>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

decision_tree_regressor_nb_struct! {i64, i64, DenseMatrixI64, BigInt64Array}
