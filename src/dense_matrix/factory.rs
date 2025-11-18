use napi::bindgen_prelude::*;
use napi_derive::napi;
use paste::paste;

use super::DenseMatrix;
use crate::linalg::basic::matrix::{
  DenseMatrixF32, DenseMatrixF64, DenseMatrixI32, DenseMatrixI64, DenseMatrixU16, DenseMatrixU32,
  DenseMatrixU64, DenseMatrixU8,
};

macro_rules! create_impl {
  (
    fit_data_type: $x:ty,
    fit_data_array_type: $xs:ty
  ) => {
    paste! {
        #[napi]
        impl DenseMatrix {
            #[napi(factory)]
            pub fn $x(
                num_samples: BigInt,
                num_features: BigInt,
                data: $xs,
                column_major: Option<bool>,
            ) -> Result<Self> {
                [<DenseMatrix $x:upper>]::new(num_samples, num_features, data, column_major).map(DenseMatrix::from)
            }
        }
    }
  };
}

create_impl! { fit_data_type: f64, fit_data_array_type: Float64Array }
create_impl! { fit_data_type: f32, fit_data_array_type: Float32Array }
create_impl! { fit_data_type: u64, fit_data_array_type: BigUint64Array }
create_impl! { fit_data_type: u32, fit_data_array_type: Uint32Array }
create_impl! { fit_data_type: u16, fit_data_array_type: Uint16Array }
create_impl! { fit_data_type: u8, fit_data_array_type: Uint8Array }
create_impl! { fit_data_type: i64, fit_data_array_type: BigInt64Array }
create_impl! { fit_data_type: i32, fit_data_array_type: Int32Array }
