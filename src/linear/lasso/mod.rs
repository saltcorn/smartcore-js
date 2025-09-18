mod parameters;

use bincode::{
  config::standard,
  serde::{decode_from_slice, encode_to_vec},
};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  api::SupervisedEstimator, linalg::basic::matrix::DenseMatrix, linear::lasso::Lasso as LibLasso,
};

use crate::linalg::basic::matrix::{DenseMatrixF32, DenseMatrixF64};
pub use parameters::LassoParameters;

macro_rules! lasso_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name=""[<Lasso $x:upper $y:upper>]"")]
        #[derive(Debug)]
        pub struct [<Lasso $x:upper $y:upper>] {
            inner: LibLasso<$x, $y, DenseMatrix<$x>, Vec<$y>>,
        }

        impl Default for [<Lasso $x:upper $y:upper>] {
            fn default() -> Self {
                Self {
                    inner: LibLasso::<$x, $y, DenseMatrix<$x>, Vec<$y>>::new(),
                }
            }
        }

        #[napi]
        impl [<Lasso $x:upper $y:upper>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self::default()
            }

            pub fn new_inner() -> LibLasso<$x, $y, DenseMatrix<$x>, Vec<$y>> {
                LibLasso::<$x, $y, DenseMatrix<$x>, Vec<$y>>::new()
            }

            #[napi(factory)]
            pub fn fit(x: &$xs, y: $ys, parameters: &LassoParameters) -> Result<Self> {
                let inner = LibLasso::fit(
                    x as &DenseMatrix<$x>,
                    &y.to_vec(),
                    parameters.as_ref().to_owned(),
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
                let inner = decode_from_slice::<LibLasso::<$x, $y, DenseMatrix<$x>, Vec<$y>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl AsRef<LibLasso<$x, $y, DenseMatrix<$x>, Vec<$y>>> for [<Lasso $x:upper $y:upper>] {
            fn as_ref(&self) -> &LibLasso<$x, $y, DenseMatrix<$x>, Vec<$y>> {
                &self.inner
            }
        }
    }
  };
}

lasso_struct! {f32, f32, DenseMatrixF32, Float32Array}
lasso_struct! {f64, f64, DenseMatrixF64, Float64Array}
lasso_struct! {f32, u32, DenseMatrixF32, Uint32Array}
