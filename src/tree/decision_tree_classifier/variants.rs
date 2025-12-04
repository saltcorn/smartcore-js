use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  tree::decision_tree_classifier::DecisionTreeClassifier as LibDecisionTreeClassifier,
};

pub type DecisionTreeClassifierF32I32 =
  LibDecisionTreeClassifier<f32, i32, LibDenseMatrix<f32>, Vec<i32>>;
pub type DecisionTreeClassifierF32I64 =
  LibDecisionTreeClassifier<f32, i64, LibDenseMatrix<f32>, Vec<i64>>;

pub type DecisionTreeClassifierF64I32 =
  LibDecisionTreeClassifier<f64, i32, LibDenseMatrix<f64>, Vec<i32>>;
pub type DecisionTreeClassifierF64I64 =
  LibDecisionTreeClassifier<f64, i64, LibDenseMatrix<f64>, Vec<i64>>;

pub type DecisionTreeClassifierI64I32 =
  LibDecisionTreeClassifier<i64, i32, LibDenseMatrix<i64>, Vec<i32>>;
pub type DecisionTreeClassifierI64I64 =
  LibDecisionTreeClassifier<i64, i64, LibDenseMatrix<i64>, Vec<i64>>;

pub type DecisionTreeClassifierI32I32 =
  LibDecisionTreeClassifier<i32, i32, LibDenseMatrix<i32>, Vec<i32>>;
pub type DecisionTreeClassifierI32I64 =
  LibDecisionTreeClassifier<i32, i64, LibDenseMatrix<i32>, Vec<i64>>;

pub type DecisionTreeClassifierU64I32 =
  LibDecisionTreeClassifier<u64, i32, LibDenseMatrix<u64>, Vec<i32>>;
pub type DecisionTreeClassifierU64I64 =
  LibDecisionTreeClassifier<u64, i64, LibDenseMatrix<u64>, Vec<i64>>;

pub type DecisionTreeClassifierU32I32 =
  LibDecisionTreeClassifier<u32, i32, LibDenseMatrix<u32>, Vec<i32>>;
pub type DecisionTreeClassifierU32I64 =
  LibDecisionTreeClassifier<u32, i64, LibDenseMatrix<u32>, Vec<i64>>;
