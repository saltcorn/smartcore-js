use smartcore::{
  cluster::kmeans::KMeans as LibKMeans, linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
};

pub type KMeansF32I32 = LibKMeans<f32, i32, LibDenseMatrix<f32>, Vec<i32>>;
pub type KMeansF32I64 = LibKMeans<f32, i64, LibDenseMatrix<f32>, Vec<i64>>;

pub type KMeansF64I32 = LibKMeans<f64, i32, LibDenseMatrix<f64>, Vec<i32>>;
pub type KMeansF64I64 = LibKMeans<f64, i64, LibDenseMatrix<f64>, Vec<i64>>;

pub type KMeansI64I32 = LibKMeans<i64, i32, LibDenseMatrix<i64>, Vec<i32>>;
pub type KMeansI64I64 = LibKMeans<i64, i64, LibDenseMatrix<i64>, Vec<i64>>;

pub type KMeansI32I32 = LibKMeans<i32, i32, LibDenseMatrix<i32>, Vec<i32>>;
pub type KMeansI32I64 = LibKMeans<i32, i64, LibDenseMatrix<i32>, Vec<i64>>;

pub type KMeansU64I32 = LibKMeans<u64, i32, LibDenseMatrix<u64>, Vec<i32>>;
pub type KMeansU64I64 = LibKMeans<u64, i64, LibDenseMatrix<u64>, Vec<i64>>;

pub type KMeansU32I32 = LibKMeans<u32, i32, LibDenseMatrix<u32>, Vec<i32>>;
pub type KMeansU32I64 = LibKMeans<u32, i64, LibDenseMatrix<u32>, Vec<i64>>;
