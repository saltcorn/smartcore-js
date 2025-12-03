use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::metrics::{cluster_hcv::HCVScore as LibHCVScore, Metrics};

use crate::{
  match_array_types::{match_array_type, MatchedArrays},
  typed_array::{TypedArrayType, TypedArrayWrapper},
};

#[napi]
pub fn hcv_score(
  y_true: TypedArrayWrapper,
  y_pred: TypedArrayWrapper,
  losslessly: Option<bool>,
) -> Result<f64> {
  match (y_true.r#type(), y_pred.r#type()) {
    (TypedArrayType::F64, _)
    | (TypedArrayType::F32, _)
    | (_, TypedArrayType::F64)
    | (_, TypedArrayType::F32) => (),
    _ => {
      return Err(Error::new(
        Status::InvalidArg,
        "Expected an array of integer values.",
      ))
    }
  }
  match match_array_type(y_true, y_pred, losslessly)? {
    MatchedArrays::F64(_, _) | MatchedArrays::F32(_, _) => unimplemented!(),
    MatchedArrays::I64(y_true, y_pred) => Ok(LibHCVScore::<i64>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::U64(y_true, y_pred) => Ok(LibHCVScore::<u64>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::I32(y_true, y_pred) => Ok(LibHCVScore::<i32>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::U32(y_true, y_pred) => Ok(LibHCVScore::<u32>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::U16(y_true, y_pred) => Ok(LibHCVScore::<u16>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::U8(y_true, y_pred) => Ok(LibHCVScore::<u8>::new().get_score(&y_true, &y_pred)),
  }
}
