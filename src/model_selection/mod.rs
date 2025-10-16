pub mod cross_validate;
pub mod kfold;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix, model_selection::train_test_split as lib_train_test_split,
};

use crate::linalg::basic::matrix::{
  DenseMatrixF32, DenseMatrixF64, DenseMatrixI32, DenseMatrixI64, DenseMatrixU16, DenseMatrixU32,
  DenseMatrixU64, DenseMatrixU8,
};

macro_rules! train_test_split_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name=""[<trainTestSplit $x:upper $y:upper>]"")]
        #[allow(non_snake_case)]
        pub fn [<train_test_split_ $x _ $y>](
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

train_test_split_struct! {f64, f64, DenseMatrixF64, Float64Array}
train_test_split_struct! {f64, i64, DenseMatrixF64, BigInt64Array}
train_test_split_struct! {f64, u64, DenseMatrixF64, BigUint64Array}
train_test_split_struct! {f64, i32, DenseMatrixF64, Int32Array}

train_test_split_struct! {f32, f64, DenseMatrixF32, Float64Array}
train_test_split_struct! {f32, i64, DenseMatrixF32, BigInt64Array}
train_test_split_struct! {f32, u64, DenseMatrixF32, BigUint64Array}
train_test_split_struct! {f32, i32, DenseMatrixF32, Int32Array}

train_test_split_struct! {i32, f64, DenseMatrixI32, Float64Array}
train_test_split_struct! {i32, i64, DenseMatrixI32, BigInt64Array}
train_test_split_struct! {i32, u64, DenseMatrixI32, BigUint64Array}
train_test_split_struct! {i32, i32, DenseMatrixI32, Int32Array}

train_test_split_struct! {u32, f64, DenseMatrixU32, Float64Array}
train_test_split_struct! {u32, i64, DenseMatrixU32, BigInt64Array}
train_test_split_struct! {u32, u64, DenseMatrixU32, BigUint64Array}
train_test_split_struct! {u32, i32, DenseMatrixU32, Int32Array}

train_test_split_struct! {i64, f64, DenseMatrixI64, Float64Array}
train_test_split_struct! {i64, i64, DenseMatrixI64, BigInt64Array}
train_test_split_struct! {i64, u64, DenseMatrixI64, BigUint64Array}
train_test_split_struct! {i64, i32, DenseMatrixI64, Int32Array}

train_test_split_struct! {u64, f64, DenseMatrixU64, Float64Array}
train_test_split_struct! {u64, i64, DenseMatrixU64, BigInt64Array}
train_test_split_struct! {u64, u64, DenseMatrixU64, BigUint64Array}
train_test_split_struct! {u64, i32, DenseMatrixU64, Int32Array}

train_test_split_struct! {u16, f64, DenseMatrixU16, Float64Array}
train_test_split_struct! {u16, i64, DenseMatrixU16, BigInt64Array}
train_test_split_struct! {u16, u64, DenseMatrixU16, BigUint64Array}
train_test_split_struct! {u16, i32, DenseMatrixU16, Int32Array}

train_test_split_struct! {u8, f64, DenseMatrixU8, Float64Array}
train_test_split_struct! {u8, i64, DenseMatrixU8, BigInt64Array}
train_test_split_struct! {u8, u64, DenseMatrixU8, BigUint64Array}
train_test_split_struct! {u8, i32, DenseMatrixU8, Int32Array}
