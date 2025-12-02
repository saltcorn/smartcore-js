use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  linear::ridge_regression::RidgeRegression as LibRidgeRegression,
};

pub type RidgeRegressionF32F64 = LibRidgeRegression<f32, f64, LibDenseMatrix<f32>, Vec<f64>>;
pub type RidgeRegressionF64F64 = LibRidgeRegression<f64, f64, LibDenseMatrix<f64>, Vec<f64>>;

pub type RidgeRegressionF32F32 = LibRidgeRegression<f32, f32, LibDenseMatrix<f32>, Vec<f32>>;
pub type RidgeRegressionF64F32 = LibRidgeRegression<f64, f32, LibDenseMatrix<f64>, Vec<f32>>;

pub type RidgeRegressionF32I64 = LibRidgeRegression<f32, i64, LibDenseMatrix<f32>, Vec<i64>>;
pub type RidgeRegressionF64I64 = LibRidgeRegression<f64, i64, LibDenseMatrix<f64>, Vec<i64>>;

pub type RidgeRegressionF32U64 = LibRidgeRegression<f32, u64, LibDenseMatrix<f32>, Vec<u64>>;
pub type RidgeRegressionF64U64 = LibRidgeRegression<f64, u64, LibDenseMatrix<f64>, Vec<u64>>;

pub type RidgeRegressionF32I32 = LibRidgeRegression<f32, i32, LibDenseMatrix<f32>, Vec<i32>>;
pub type RidgeRegressionF64I32 = LibRidgeRegression<f64, i32, LibDenseMatrix<f64>, Vec<i32>>;
