pub mod parameters;

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
  tree::decision_tree_classifier::DecisionTreeClassifier as LibDecisionTreeClassifier,
};

use crate::linalg::basic::matrix::DenseMatrixI64;
use parameters::DecisionTreeClassifierParameters;

macro_rules! decision_tree_classifier_nb_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name=""[<DecisionTreeClassifier $x:upper $y:upper>]"")]
        #[derive(Debug)]
        pub struct [<DecisionTreeClassifier $x:upper $y:upper>] {
            inner: LibDecisionTreeClassifier<$x, $y, DenseMatrix<$x>, Vec<$y>>,
        }

        #[napi]
        impl [<DecisionTreeClassifier $x:upper $y:upper>] {
            #[napi(factory)]
            pub fn fit(x: &$xs, y: $ys, parameters: &DecisionTreeClassifierParameters) -> Result<Self> {
                let inner = LibDecisionTreeClassifier::fit(
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
                let inner = decode_from_slice::<LibDecisionTreeClassifier<$x, $y, DenseMatrix<$x>, Vec<$y>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl Deref for [<DecisionTreeClassifier $x:upper $y:upper>] {
            type Target = LibDecisionTreeClassifier<$x, $y, DenseMatrix<$x>, Vec<$y>>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

decision_tree_classifier_nb_struct! {i64, i64, DenseMatrixI64, BigInt64Array}
