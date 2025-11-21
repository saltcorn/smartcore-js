use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  linear::linear_regression::LinearRegression as LibLinearRegression,
};

pub type LinearRegressionF32F64 = LibLinearRegression<f32, f64, LibDenseMatrix<f32>, Vec<f64>>;
pub type LinearRegressionF64F64 = LibLinearRegression<f64, f64, LibDenseMatrix<f64>, Vec<f64>>;

pub type LinearRegressionF32F32 = LibLinearRegression<f32, f32, LibDenseMatrix<f32>, Vec<f32>>;
pub type LinearRegressionF64F32 = LibLinearRegression<f64, f32, LibDenseMatrix<f64>, Vec<f32>>;

pub type LinearRegressionF32I64 = LibLinearRegression<f32, i64, LibDenseMatrix<f32>, Vec<i64>>;
pub type LinearRegressionF64I64 = LibLinearRegression<f64, i64, LibDenseMatrix<f64>, Vec<i64>>;

pub type LinearRegressionF32U64 = LibLinearRegression<f32, u64, LibDenseMatrix<f32>, Vec<u64>>;
pub type LinearRegressionF64U64 = LibLinearRegression<f64, u64, LibDenseMatrix<f64>, Vec<u64>>;

pub type LinearRegressionF32I32 = LibLinearRegression<f32, i32, LibDenseMatrix<f32>, Vec<i32>>;
pub type LinearRegressionF64I32 = LibLinearRegression<f64, i32, LibDenseMatrix<f64>, Vec<i32>>;
