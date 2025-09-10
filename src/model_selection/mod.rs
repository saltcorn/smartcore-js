use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix, model_selection::train_test_split as lib_train_test_split,
};

use crate::linalg::basic::matrix::{DenseMatrixf32, DenseMatrixf64};

macro_rules! train_test_split_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi]
        pub fn [<train_test_split_ $x _ $y>](
            x: &$xs,
            y: $ys,
            test_size: f64,
            shuffle: bool,
            seed: Option<BigInt>,
        ) -> ($xs, $xs, $ys, $ys) {
            let y = y.to_vec();
            let seed = seed.map(|s| s.get_u64().1);
            let (x_train, x_test, y_train, y_test) =
                lib_train_test_split(x as &DenseMatrix<$x>, &y, test_size as f32, shuffle, seed);
            (
                $xs::from_inner(x_train),
                $xs::from_inner(x_test),
                $ys::new(y_train),
                $ys::new(y_test),
            )
        }
    }
  };
}

train_test_split_struct! {f32, f32, DenseMatrixf32, Float32Array}
train_test_split_struct! {f64, f64, DenseMatrixf64, Float64Array}
