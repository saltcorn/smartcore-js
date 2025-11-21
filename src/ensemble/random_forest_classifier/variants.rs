use smartcore::{
  ensemble::random_forest_classifier::RandomForestClassifier as LibRandomForestClassifier,
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
};

pub type RandomForestClassifierF32I64 =
  LibRandomForestClassifier<f32, i64, LibDenseMatrix<f32>, Vec<i64>>;
pub type RandomForestClassifierF64I64 =
  LibRandomForestClassifier<f64, i64, LibDenseMatrix<f64>, Vec<i64>>;

pub type RandomForestClassifierF32U64 =
  LibRandomForestClassifier<f32, u64, LibDenseMatrix<f32>, Vec<u64>>;
pub type RandomForestClassifierF64U64 =
  LibRandomForestClassifier<f64, u64, LibDenseMatrix<f64>, Vec<u64>>;

pub type RandomForestClassifierF32I32 =
  LibRandomForestClassifier<f32, i32, LibDenseMatrix<f32>, Vec<i32>>;
pub type RandomForestClassifierF64I32 =
  LibRandomForestClassifier<f64, i32, LibDenseMatrix<f64>, Vec<i32>>;
