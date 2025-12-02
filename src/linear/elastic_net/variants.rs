use smartcore::{
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  linear::elastic_net::ElasticNet as LibElasticNet,
};

pub type ElasticNetF32F64 = LibElasticNet<f32, f64, LibDenseMatrix<f32>, Vec<f64>>;
pub type ElasticNetF64F64 = LibElasticNet<f64, f64, LibDenseMatrix<f64>, Vec<f64>>;

pub type ElasticNetF32F32 = LibElasticNet<f32, f32, LibDenseMatrix<f32>, Vec<f32>>;
pub type ElasticNetF64F32 = LibElasticNet<f64, f32, LibDenseMatrix<f64>, Vec<f32>>;

pub type ElasticNetF32I64 = LibElasticNet<f32, i64, LibDenseMatrix<f32>, Vec<i64>>;
pub type ElasticNetF64I64 = LibElasticNet<f64, i64, LibDenseMatrix<f64>, Vec<i64>>;

pub type ElasticNetF32U64 = LibElasticNet<f32, u64, LibDenseMatrix<f32>, Vec<u64>>;
pub type ElasticNetF64U64 = LibElasticNet<f64, u64, LibDenseMatrix<f64>, Vec<u64>>;

pub type ElasticNetF32I32 = LibElasticNet<f32, i32, LibDenseMatrix<f32>, Vec<i32>>;
pub type ElasticNetF64I32 = LibElasticNet<f64, i32, LibDenseMatrix<f64>, Vec<i32>>;
