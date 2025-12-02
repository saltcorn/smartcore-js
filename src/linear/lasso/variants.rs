use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix, linear::lasso::Lasso as LibLasso,
};

pub type LassoF32F64 = LibLasso<f32, f64, LibDenseMatrix<f32>, Vec<f64>>;
pub type LassoF64F64 = LibLasso<f64, f64, LibDenseMatrix<f64>, Vec<f64>>;

pub type LassoF32F32 = LibLasso<f32, f32, LibDenseMatrix<f32>, Vec<f32>>;
pub type LassoF64F32 = LibLasso<f64, f32, LibDenseMatrix<f64>, Vec<f32>>;

pub type LassoF32I64 = LibLasso<f32, i64, LibDenseMatrix<f32>, Vec<i64>>;
pub type LassoF64I64 = LibLasso<f64, i64, LibDenseMatrix<f64>, Vec<i64>>;

pub type LassoF32U64 = LibLasso<f32, u64, LibDenseMatrix<f32>, Vec<u64>>;
pub type LassoF64U64 = LibLasso<f64, u64, LibDenseMatrix<f64>, Vec<u64>>;

pub type LassoF32I32 = LibLasso<f32, i32, LibDenseMatrix<f32>, Vec<i32>>;
pub type LassoF64I32 = LibLasso<f64, i32, LibDenseMatrix<f64>, Vec<i32>>;
