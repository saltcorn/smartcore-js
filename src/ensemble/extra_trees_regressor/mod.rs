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
  ensemble::extra_trees_regressor::ExtraTreesRegressor as LibExtraTreesRegressor,
  linalg::basic::matrix::DenseMatrix,
};

use crate::linalg::basic::matrix::DenseMatrixF64;
use parameters::ExtraTreesRegressorParameters;

macro_rules! extra_trees_regressor_nb_struct {
  ( $x:ty, $y:ty, $y_mod:literal, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name=""[<ExtraTreesRegressor $x:upper $y_mod $y:upper>]"")]
        #[derive(Debug)]
        pub struct [<ExtraTreesRegressor $x:upper $y_mod $y:upper>] {
            inner: LibExtraTreesRegressor<$x, $y, DenseMatrix<$x>, Vec<$y>>,
        }

        #[napi]
        impl [<ExtraTreesRegressor $x:upper $y_mod $y:upper>] {
            #[napi(factory)]
            pub fn fit(x: &$xs, y: $ys, parameters: &ExtraTreesRegressorParameters) -> Result<Self> {
                let inner = LibExtraTreesRegressor::fit(
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
                Ok(prediction_result.into())
            }

            #[napi]
            pub fn serialize(&self) -> Result<Buffer> {
                let encoded = encode_to_vec(&self.inner, standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Buffer::from(encoded))
            }

            #[napi(factory)]
            pub fn deserialize(data: Buffer) -> Result<Self> {
                let inner = decode_from_slice::<LibExtraTreesRegressor<$x, $y, DenseMatrix<$x>, Vec<$y>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl Deref for [<ExtraTreesRegressor $x:upper $y_mod $y:upper>] {
            type Target = LibExtraTreesRegressor<$x, $y, DenseMatrix<$x>, Vec<$y>>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

extra_trees_regressor_nb_struct! {f64, f64, "", DenseMatrixF64, Float64Array}
extra_trees_regressor_nb_struct! {f64, i64, "", DenseMatrixF64, Vec<i64>}
extra_trees_regressor_nb_struct! {f64, i64, "Big", DenseMatrixF64, BigInt64Array}
extra_trees_regressor_nb_struct! {f64, u64, "Big", DenseMatrixF64, BigUint64Array}
