pub mod cross_validate;
pub mod kfold;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix, model_selection::train_test_split as lib_train_test_split,
};

use crate::linalg::basic::matrix::DenseMatrixF64;

macro_rules! train_test_split_struct {
  ( $x:ty, $y:ty, $y_mod:literal, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name=""[<trainTestSplit $x:upper $y_mod $y:upper>]"")]
        #[allow(non_snake_case)]
        pub fn [<train_test_split_ $x _ $y_mod _ $y>](
            x: &$xs,
            y: $ys,
            test_size: f64,
            shuffle: bool,
            seed: Option<BigInt>,
        ) -> ($xs, $xs, $ys, $ys) {
            let seed = seed.map(|s| s.get_u64().1);
            let (x_train, x_test, y_train, y_test) =
                lib_train_test_split(x as &DenseMatrix<$x>, &y.to_vec(), test_size as f32, shuffle, seed);
            (
                $xs::from_inner(x_train),
                $xs::from_inner(x_test),
                y_train.into(),
                y_test.into(),
            )
        }
    }
  };
}

train_test_split_struct! {f64, f64, "", DenseMatrixF64, Float64Array}
train_test_split_struct! {f64, i64, "", DenseMatrixF64, Vec<i64>}
train_test_split_struct! {f64, i64, "Big", DenseMatrixF64, BigInt64Array}
train_test_split_struct! {f64, u64, "Big", DenseMatrixF64, BigUint64Array}
