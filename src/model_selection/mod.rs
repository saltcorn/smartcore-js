pub mod cross_validate;
pub mod kfold;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix, model_selection::train_test_split as lib_train_test_split,
};

use crate::{
  linalg::basic::matrix::{DenseMatrixF32, DenseMatrixF64},
  refs::{DatasetF32F32JsVecRef, DatasetF32U32JsVecRef, DatasetF64F64JsVecRef},
};

macro_rules! train_test_split_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty, $ys_js:ty ) => {
    paste! {
        #[napi(js_name=""[<trainTestSplit $x:upper $y:upper>]"")]
        pub fn [<train_test_split_ $x _ $y>](
            x: &$xs,
            y: &$ys,
            test_size: f64,
            shuffle: bool,
            seed: Option<BigInt>,
        ) -> ($xs, $xs, $ys_js, $ys_js) {
            let seed = seed.map(|s| s.get_u64().1);
            let (x_train, x_test, y_train, y_test) =
                lib_train_test_split(x as &DenseMatrix<$x>, y.as_ref(), test_size as f32, shuffle, seed);
            (
                $xs::from_inner(x_train),
                $xs::from_inner(x_test),
                $ys_js::new(y_train),
                $ys_js::new(y_test),
            )
        }
    }
  };
}

train_test_split_struct! {f32, f32, DenseMatrixF32, DatasetF32F32JsVecRef, Float32Array}
train_test_split_struct! {f64, f64, DenseMatrixF64, DatasetF64F64JsVecRef, Float64Array}
train_test_split_struct! {f32, u32, DenseMatrixF32, DatasetF32U32JsVecRef, Uint32Array}
