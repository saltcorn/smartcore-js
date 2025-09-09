use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::{
  linalg::basic::matrix::DenseMatrix, model_selection::train_test_split as lib_train_test_split,
};

use crate::linalg::basic::matrix::F32DenseMatrix;

#[napi]
pub fn train_test_split_f32_f32(
  x: &F32DenseMatrix,
  y: Float32Array,
  test_size: f64,
  shuffle: bool,
  seed: Option<BigInt>,
) -> (F32DenseMatrix, F32DenseMatrix, Float32Array, Float32Array) {
  let y = y.to_vec();
  let seed = seed.map(|s| s.get_u64().1);
  let (x_train, x_test, y_train, y_test) =
    lib_train_test_split(x as &DenseMatrix<f32>, &y, test_size as f32, shuffle, seed);
  (
    F32DenseMatrix::from_inner(x_train),
    F32DenseMatrix::from_inner(x_test),
    Float32Array::new(y_train),
    Float32Array::new(y_test),
  )
}
