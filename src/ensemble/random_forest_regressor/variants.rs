use smartcore::{
  ensemble::random_forest_regressor::RandomForestRegressor as LibRandomForestRegressor,
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
};

pub type RandomForestRegressorF32F64 =
  LibRandomForestRegressor<f32, f64, LibDenseMatrix<f32>, Vec<f64>>;
pub type RandomForestRegressorF64F64 =
  LibRandomForestRegressor<f64, f64, LibDenseMatrix<f64>, Vec<f64>>;

pub type RandomForestRegressorF32F32 =
  LibRandomForestRegressor<f32, f32, LibDenseMatrix<f32>, Vec<f32>>;
pub type RandomForestRegressorF64F32 =
  LibRandomForestRegressor<f64, f32, LibDenseMatrix<f64>, Vec<f32>>;

pub type RandomForestRegressorF32I64 =
  LibRandomForestRegressor<f32, i64, LibDenseMatrix<f32>, Vec<i64>>;
pub type RandomForestRegressorF64I64 =
  LibRandomForestRegressor<f64, i64, LibDenseMatrix<f64>, Vec<i64>>;

pub type RandomForestRegressorF32U64 =
  LibRandomForestRegressor<f32, u64, LibDenseMatrix<f32>, Vec<u64>>;
pub type RandomForestRegressorF64U64 =
  LibRandomForestRegressor<f64, u64, LibDenseMatrix<f64>, Vec<u64>>;

pub type RandomForestRegressorF32I32 =
  LibRandomForestRegressor<f32, i32, LibDenseMatrix<f32>, Vec<i32>>;
pub type RandomForestRegressorF64I32 =
  LibRandomForestRegressor<f64, i32, LibDenseMatrix<f64>, Vec<i32>>;
