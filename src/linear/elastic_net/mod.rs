mod parameters;

use bincode::{
  config::standard,
  serde::{decode_from_slice, encode_to_vec},
};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;
use smartcore::{
  api::SupervisedEstimator, linalg::basic::matrix::DenseMatrix,
  linear::elastic_net::ElasticNet as LibElasticNet,
};

use crate::linalg::basic::matrix::{DenseMatrixF32, DenseMatrixF64};
pub use parameters::ElasticNetParameters;

macro_rules! elastic_net_struct {
  (
    feature_type: $feat:ty,
    predict_output_type: $id:ty,
    matrix_type: $matrix:ty,
    array_type: $array:ty
  ) => {
    paste! {
        #[napi(js_name=""[<ElasticNet $feat:upper $id:upper>]"")]
        #[derive(Debug)]
        pub struct [<ElasticNet $feat:upper $id:upper>] {
            inner: LibElasticNet<$feat, $id, DenseMatrix<$feat>, Vec<$id>>,
        }

        impl Default for [<ElasticNet $feat:upper $id:upper>] {
            fn default() -> Self {
                Self {
                    inner: LibElasticNet::<$feat, $id, DenseMatrix<$feat>, Vec<$id>>::new(),
                }
            }
        }

        #[napi]
        impl [<ElasticNet $feat:upper $id:upper>] {
            #[napi(constructor)]
            pub fn new() -> Self {
                Self::default()
            }

            pub fn new_inner() -> LibElasticNet<$feat, $id, DenseMatrix<$feat>, Vec<$id>> {
                LibElasticNet::<$feat, $id, DenseMatrix<$feat>, Vec<$id>>::new()
            }

            #[napi(factory)]
            pub fn fit(x: &$matrix, y: $array, parameters: &ElasticNetParameters) -> Result<Self> {
                let inner = LibElasticNet::fit(
                    x as &DenseMatrix<$feat>,
                    &y.to_vec(),
                    parameters.as_ref().to_owned(),
                )
                .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Self { inner })
            }

            #[napi]
            pub fn predict(&self, x: &$matrix) -> Result<$array> {
                let prediction_result = self
                .inner
                .predict(x as &DenseMatrix<$feat>)
                .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(prediction_result.into())
            }

            #[napi]
            pub fn serialize(&self) -> Result<Buffer> {
                let encoded = encode_to_vec(&self.inner, standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Buffer::from(encoded))
            }

            #[napi(factory)]
            pub fn deserialize(data: Buffer) -> Result<Self> {
                let inner = decode_from_slice::<LibElasticNet::<$feat, $id, DenseMatrix<$feat>, Vec<$id>>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }

        impl AsRef<LibElasticNet<$feat, $id, DenseMatrix<$feat>, Vec<$id>>> for [<ElasticNet $feat:upper $id:upper>] {
            fn as_ref(&self) -> &LibElasticNet<$feat, $id, DenseMatrix<$feat>, Vec<$id>> {
                &self.inner
            }
        }
    }
  };
}

// [f32, f64]
elastic_net_struct! {
    feature_type: f32,
    predict_output_type: f64,
    matrix_type: DenseMatrixF32,
    array_type: Float64Array
}

// [f32, f32]
elastic_net_struct! {
    feature_type: f32,
    predict_output_type: f32,
    matrix_type: DenseMatrixF32,
    array_type: Float32Array
}

// [f32, i64]
elastic_net_struct! {
    feature_type: f32,
    predict_output_type: i64,
    matrix_type: DenseMatrixF32,
    array_type: BigInt64Array
}

// [f32, u64]
elastic_net_struct! {
    feature_type: f32,
    predict_output_type: u64,
    matrix_type: DenseMatrixF32,
    array_type: BigUint64Array
}

// [f32, i32]
elastic_net_struct! {
    feature_type: f32,
    predict_output_type: i32,
    matrix_type: DenseMatrixF32,
    array_type: Int32Array
}

// [f64, f64]
elastic_net_struct! {
    feature_type: f64,
    predict_output_type: f64,
    matrix_type: DenseMatrixF64,
    array_type: Float64Array
}

// [f64, f32]
elastic_net_struct! {
    feature_type: f64,
    predict_output_type: f32,
    matrix_type: DenseMatrixF64,
    array_type: Float32Array
}

// [f64, i64]
elastic_net_struct! {
    feature_type: f64,
    predict_output_type: i64,
    matrix_type: DenseMatrixF64,
    array_type: BigInt64Array
}

// [f64, u64]
elastic_net_struct! {
    feature_type: f64,
    predict_output_type: u64,
    matrix_type: DenseMatrixF64,
    array_type: BigUint64Array
}

// [f64, i32]
elastic_net_struct! {
    feature_type: f64,
    predict_output_type: i32,
    matrix_type: DenseMatrixF64,
    array_type: Int32Array
}
