use paste::paste;
use smartcore::{
  cluster::dbscan::DBSCAN,
  linalg::basic::matrix::DenseMatrix as LibDenseMatrix,
  metrics::distance::{
    euclidian::Euclidian, hamming::Hamming, mahalanobis::Mahalanobis as LibMahalanobis,
    manhattan::Manhattan, minkowski::Minkowski,
  },
};

type Mahalanobis<T> = LibMahalanobis<T, LibDenseMatrix<f64>>;

macro_rules! define_variant_type {
    ($x: ty, $dist: ident) => {
        paste! {
            pub type [<DBSCAN $x:upper $dist>] = DBSCAN<$x, i32, LibDenseMatrix<$x>, Vec<i32>, $dist<$x>>;
        }
    }
}

define_variant_type!(f32, Euclidian);
define_variant_type!(f32, Mahalanobis);
define_variant_type!(f32, Manhattan);
define_variant_type!(f32, Minkowski);
define_variant_type!(f64, Euclidian);
define_variant_type!(f64, Mahalanobis);
define_variant_type!(f64, Manhattan);
define_variant_type!(f64, Minkowski);
define_variant_type!(i32, Euclidian);
define_variant_type!(i32, Hamming);
define_variant_type!(i32, Manhattan);
define_variant_type!(i32, Minkowski);
define_variant_type!(i64, Euclidian);
define_variant_type!(i64, Manhattan);
define_variant_type!(i64, Minkowski);
define_variant_type!(u16, Euclidian);
define_variant_type!(u16, Hamming);
define_variant_type!(u32, Euclidian);
define_variant_type!(u32, Manhattan);
define_variant_type!(u64, Euclidian);
define_variant_type!(u64, Manhattan);
define_variant_type!(u8, Euclidian);
define_variant_type!(u8, Hamming);
