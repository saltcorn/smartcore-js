use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  linalg::basic::matrix::DenseMatrix, metrics::distance::euclidian::Euclidian,
  neighbors::knn_classifier::KNNClassifier as LibKNNClassifier,
};

use crate::{linalg::basic::matrix::DenseMatrixF32, refs::DatasetF32U32JsVecRef};

macro_rules! knn_classifier_struct {
  ( $x:ty, $y:ty, $xs:ty, $ys:ty, $d:ty, $ys_js:ty ) => {
    paste! {
        #[napi(js_name=""[<KNNClassifier $x:upper $y:upper>]"")]
        #[derive(Debug)]
        pub struct [<KNNClassifier $x:upper $y:upper>] {
            inner: LibKNNClassifier<$x, $y, DenseMatrix<$x>, Vec<$y>, $d>,
        }

        #[napi]
        impl [<KNNClassifier $x:upper $y:upper>] {
            #[napi(factory)]
            pub fn fit(x: &$xs, y: &$ys) -> Result<Self> {
                let inner = LibKNNClassifier::<$x, $y, DenseMatrix<$x>, Vec<$y>, $d>::fit(x, y.as_ref(), Default::default())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Self { inner })
            }

            #[napi]
            pub fn predict(&self, x: &$xs) -> Result<$ys_js> {
                let predict_result = self.inner.predict(x).map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok($ys_js::new(predict_result))
            }
        }
    }
  };
}

knn_classifier_struct! {f32, u32, DenseMatrixF32, DatasetF32U32JsVecRef, Euclidian<f32>, Uint32Array}
