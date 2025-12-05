use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::metrics::{r2::R2 as LibR2, Metrics};

use crate::{
  match_array_types::{match_array_type, MatchedArrays},
  typed_array::TypedArrayWrapper,
};

#[napi]
pub fn r2_score(
  y_true: TypedArrayWrapper,
  y_pred: TypedArrayWrapper,
  losslessly: Option<bool>,
) -> Result<f64> {
  match match_array_type(y_true, y_pred, losslessly)? {
    MatchedArrays::F64(y_true, y_pred) => Ok(LibR2::<f64>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::F32(y_true, y_pred) => Ok(LibR2::<f32>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::I64(y_true, y_pred) => Ok(LibR2::<i64>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::U64(y_true, y_pred) => Ok(LibR2::<u64>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::I32(y_true, y_pred) => Ok(LibR2::<i32>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::U32(y_true, y_pred) => Ok(LibR2::<u32>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::U16(y_true, y_pred) => Ok(LibR2::<u16>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::U8(y_true, y_pred) => Ok(LibR2::<u8>::new().get_score(&y_true, &y_pred)),
  }
}
