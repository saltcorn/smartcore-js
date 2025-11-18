pub mod cross_validate;
pub mod kfold;

use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  model_selection::train_test_split as lib_train_test_split,
};

use crate::dense_matrix::DenseMatrix;

macro_rules! train_test_split_impl {
  ( $x:ty, $y:ty, $ys:ty ) => {
    paste! {
        #[napi(js_name=""[<trainTestSplit $x:upper $y:upper>]"")]
        pub fn [<train_test_split_ $x _ $y>](
            x: &DenseMatrix,
            y: $ys,
            test_size: f64,
            shuffle: bool,
            seed: Option<BigInt>,
        ) -> Result<(DenseMatrix, DenseMatrix, $ys, $ys)> {
            let seed = seed.map(|s| s.get_u64().1);
            let x: &LibDenseMatrix<$x> = x.try_into()?;
            let (x_train, x_test, y_train, y_test) =
                lib_train_test_split(x, &y.to_vec(), test_size as f32, shuffle, seed);
            Ok((x_train.into(), x_test.into(), y_train.into(), y_test.into()))
        }
    }
  };
}

train_test_split_impl! {f64, f64, Float64Array}
train_test_split_impl! {f64, f32, Float32Array}
train_test_split_impl! {f64, i64, BigInt64Array}
train_test_split_impl! {f64, u64, BigUint64Array}
train_test_split_impl! {f64, i32, Int32Array}

train_test_split_impl! {f32, f64, Float64Array}
train_test_split_impl! {f32, f32, Float32Array}
train_test_split_impl! {f32, i64, BigInt64Array}
train_test_split_impl! {f32, u64, BigUint64Array}
train_test_split_impl! {f32, i32, Int32Array}

train_test_split_impl! {i32, f64, Float64Array}
train_test_split_impl! {i32, f32, Float32Array}
train_test_split_impl! {i32, i64, BigInt64Array}
train_test_split_impl! {i32, u64, BigUint64Array}
train_test_split_impl! {i32, i32, Int32Array}

train_test_split_impl! {u32, f64, Float64Array}
train_test_split_impl! {u32, f32, Float32Array}
train_test_split_impl! {u32, i64, BigInt64Array}
train_test_split_impl! {u32, u64, BigUint64Array}
train_test_split_impl! {u32, i32, Int32Array}

train_test_split_impl! {i64, f64, Float64Array}
train_test_split_impl! {i64, f32, Float32Array}
train_test_split_impl! {i64, i64, BigInt64Array}
train_test_split_impl! {i64, u64, BigUint64Array}
train_test_split_impl! {i64, i32, Int32Array}

train_test_split_impl! {u64, f64, Float64Array}
train_test_split_impl! {u64, f32, Float32Array}
train_test_split_impl! {u64, i64, BigInt64Array}
train_test_split_impl! {u64, u64, BigUint64Array}
train_test_split_impl! {u64, i32, Int32Array}

train_test_split_impl! {u16, f64, Float64Array}
train_test_split_impl! {u16, f32, Float32Array}
train_test_split_impl! {u16, i64, BigInt64Array}
train_test_split_impl! {u16, u64, BigUint64Array}
train_test_split_impl! {u16, i32, Int32Array}

train_test_split_impl! {u8, f64, Float64Array}
train_test_split_impl! {u8, f32, Float32Array}
train_test_split_impl! {u8, i64, BigInt64Array}
train_test_split_impl! {u8, u64, BigUint64Array}
train_test_split_impl! {u8, i32, Int32Array}
