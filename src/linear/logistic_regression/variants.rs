use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  linear::logistic_regression::LogisticRegression as LibLogisticRegression,
};

pub type LogisticRegressionF32I64 = LibLogisticRegression<f32, i64, LibDenseMatrix<f32>, Vec<i64>>;
pub type LogisticRegressionF64I64 = LibLogisticRegression<f64, i64, LibDenseMatrix<f64>, Vec<i64>>;

pub type LogisticRegressionF32U64 = LibLogisticRegression<f32, u64, LibDenseMatrix<f32>, Vec<u64>>;
pub type LogisticRegressionF64U64 = LibLogisticRegression<f64, u64, LibDenseMatrix<f64>, Vec<u64>>;

pub type LogisticRegressionF32I32 = LibLogisticRegression<f32, i32, LibDenseMatrix<f32>, Vec<i32>>;
pub type LogisticRegressionF64I32 = LibLogisticRegression<f64, i32, LibDenseMatrix<f64>, Vec<i32>>;
