use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  tree::decision_tree_regressor::DecisionTreeRegressor as LibDecisionTreeRegressor,
};

pub type DecisionTreeRegressorF32I32 =
  LibDecisionTreeRegressor<f32, i32, LibDenseMatrix<f32>, Vec<i32>>;
pub type DecisionTreeRegressorF32I64 =
  LibDecisionTreeRegressor<f32, i64, LibDenseMatrix<f32>, Vec<i64>>;

pub type DecisionTreeRegressorF64I32 =
  LibDecisionTreeRegressor<f64, i32, LibDenseMatrix<f64>, Vec<i32>>;
pub type DecisionTreeRegressorF64I64 =
  LibDecisionTreeRegressor<f64, i64, LibDenseMatrix<f64>, Vec<i64>>;

pub type DecisionTreeRegressorI64I32 =
  LibDecisionTreeRegressor<i64, i32, LibDenseMatrix<i64>, Vec<i32>>;
pub type DecisionTreeRegressorI64I64 =
  LibDecisionTreeRegressor<i64, i64, LibDenseMatrix<i64>, Vec<i64>>;

pub type DecisionTreeRegressorI32I32 =
  LibDecisionTreeRegressor<i32, i32, LibDenseMatrix<i32>, Vec<i32>>;
pub type DecisionTreeRegressorI32I64 =
  LibDecisionTreeRegressor<i32, i64, LibDenseMatrix<i32>, Vec<i64>>;

pub type DecisionTreeRegressorU64I32 =
  LibDecisionTreeRegressor<u64, i32, LibDenseMatrix<u64>, Vec<i32>>;
pub type DecisionTreeRegressorU64I64 =
  LibDecisionTreeRegressor<u64, i64, LibDenseMatrix<u64>, Vec<i64>>;

pub type DecisionTreeRegressorU32I32 =
  LibDecisionTreeRegressor<u32, i32, LibDenseMatrix<u32>, Vec<i32>>;
pub type DecisionTreeRegressorU32I64 =
  LibDecisionTreeRegressor<u32, i64, LibDenseMatrix<u32>, Vec<i64>>;
