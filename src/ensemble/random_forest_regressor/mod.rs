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
  ensemble::random_forest_regressor::RandomForestRegressor as LibRandomForestRegressor,
  linalg::basic::matrix::DenseMatrix,
};

use crate::{
  linalg::basic::matrix::{DenseMatrixF32, DenseMatrixF64},
  refs::{
    DatasetF32F32JsVecRef, DatasetF32U32JsVecRef, DatasetF64F64JsVecRef, DatasetF64U64JsVecRef,
  },
};
use parameters::RandomForestRegressorParameters;

macro_rules! random_forest_regressor_nb_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty, $ys_js:ty ) => {
    paste! {
        #[napi(js_name=""[<RandomForestRegressor $x:upper $y:upper>]"")]
        #[derive(Debug)]
        pub struct [<RandomForestRegressor $x:upper $y:upper>] {
            inner: LibRandomForestRegressor<$x, $y, DenseMatrix<$x>, Vec<$y>>,
        }

        #[napi]
        impl [<RandomForestRegressor $x:upper $y:upper>] {
            #[napi(factory)]
            pub fn fit(x: &$xs, y: &$ys, parameters: &RandomForestRegressorParameters) -> Result<Self> {
                let inner = LibRandomForestRegressor::fit(
                    x as &DenseMatrix<$x>,
                    y.as_ref(),
                    parameters.owned_inner(),
                )
                .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Self { inner })
            }

            #[napi]
            pub fn predict(&self, x: &$xs) -> Result<$ys_js> {
                let prediction_result = self
                .inner
                .predict(x as &DenseMatrix<$x>)
                .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok($ys_js::new(prediction_result))
            }

            #[napi]
            pub fn serialize(&self) -> Result<Buffer> {
                let encoded = encode_to_vec(&self.inner, standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Buffer::from(encoded))
            }

            #[napi(factory)]
            pub fn deserialize(data: Buffer) -> Result<Self> {
                let inner = decode_from_slice::<LibRandomForestRegressor<$x, $y, DenseMatrix<$x>, Vec<$y>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl Deref for [<RandomForestRegressor $x:upper $y:upper>] {
            type Target = LibRandomForestRegressor<$x, $y, DenseMatrix<$x>, Vec<$y>>;

            fn deref(&self) -> &Self::Target {
                &self.inner
            }
        }
    }
  };
}

random_forest_regressor_nb_struct! {f32, u32, DenseMatrixF32, DatasetF32U32JsVecRef, Uint32Array}
random_forest_regressor_nb_struct! {f32, f32, DenseMatrixF32, DatasetF32F32JsVecRef, Float32Array}
random_forest_regressor_nb_struct! {f64, u64, DenseMatrixF64, DatasetF64U64JsVecRef, BigUint64Array}
random_forest_regressor_nb_struct! {f64, f64, DenseMatrixF64, DatasetF64F64JsVecRef, Float64Array}
