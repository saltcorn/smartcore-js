use smartcore::{
  ensemble::extra_trees_regressor::ExtraTreesRegressor as LibExtraTreesRegressor,
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
};

pub type ExtraTreesRegressorF32F64 =
  LibExtraTreesRegressor<f32, f64, LibDenseMatrix<f32>, Vec<f64>>;
pub type ExtraTreesRegressorF64F64 =
  LibExtraTreesRegressor<f64, f64, LibDenseMatrix<f64>, Vec<f64>>;

pub type ExtraTreesRegressorF32F32 =
  LibExtraTreesRegressor<f32, f32, LibDenseMatrix<f32>, Vec<f32>>;
pub type ExtraTreesRegressorF64F32 =
  LibExtraTreesRegressor<f64, f32, LibDenseMatrix<f64>, Vec<f32>>;

pub type ExtraTreesRegressorF32I64 =
  LibExtraTreesRegressor<f32, i64, LibDenseMatrix<f32>, Vec<i64>>;
pub type ExtraTreesRegressorF64I64 =
  LibExtraTreesRegressor<f64, i64, LibDenseMatrix<f64>, Vec<i64>>;

pub type ExtraTreesRegressorF32U64 =
  LibExtraTreesRegressor<f32, u64, LibDenseMatrix<f32>, Vec<u64>>;
pub type ExtraTreesRegressorF64U64 =
  LibExtraTreesRegressor<f64, u64, LibDenseMatrix<f64>, Vec<u64>>;

pub type ExtraTreesRegressorF32I32 =
  LibExtraTreesRegressor<f32, i32, LibDenseMatrix<f32>, Vec<i32>>;
pub type ExtraTreesRegressorF64I32 =
  LibExtraTreesRegressor<f64, i32, LibDenseMatrix<f64>, Vec<i32>>;
