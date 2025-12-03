use napi::Result;
use napi_derive::napi;
use smartcore::metrics::{accuracy::Accuracy as LibAccuracy, Metrics};

use crate::{
  match_array_types::{match_array_type, MatchedArrays},
  typed_array::TypedArrayWrapper,
};

#[napi]
pub fn accuracy_score(
  y_true: TypedArrayWrapper,
  y_pred: TypedArrayWrapper,
  losslessly: Option<bool>,
) -> Result<f64> {
  match match_array_type(y_true, y_pred, losslessly)? {
    MatchedArrays::F64(y_true, y_pred) => Ok(LibAccuracy::<f64>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::F32(y_true, y_pred) => Ok(LibAccuracy::<f32>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::I64(y_true, y_pred) => Ok(LibAccuracy::<i64>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::U64(y_true, y_pred) => Ok(LibAccuracy::<u64>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::I32(y_true, y_pred) => Ok(LibAccuracy::<i32>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::U32(y_true, y_pred) => Ok(LibAccuracy::<u32>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::U16(y_true, y_pred) => Ok(LibAccuracy::<u16>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::U8(y_true, y_pred) => Ok(LibAccuracy::<u8>::new().get_score(&y_true, &y_pred)),
  }
}
