use smartcore::{linalg::basic::matrix::DenseMatrix as LibDenseMatrix, svm::svr::SVR as LibSVR};

pub type SVRF32<'a> = LibSVR<'a, f32, LibDenseMatrix<f32>, Vec<f32>>;
pub type SVRF64<'a> = LibSVR<'a, f64, LibDenseMatrix<f64>, Vec<f64>>;
