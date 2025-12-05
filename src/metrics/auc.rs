use napi::bindgen_prelude::*;
use napi_derive::napi;
use smartcore::metrics::{auc::AUC as LibAUC, Metrics};

use crate::{
  match_array_types::{match_array_type, MatchedArrays},
  typed_array::{TypedArrayType, TypedArrayWrapper},
};

#[napi]
pub fn auc_score(
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
        "Expected an array of floating point values.",
      ))
    }
  }
  match match_array_type(y_true, y_pred, losslessly)? {
    MatchedArrays::F64(y_true, y_pred) => Ok(LibAUC::<f64>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::F32(y_true, y_pred) => Ok(LibAUC::<f32>::new().get_score(&y_true, &y_pred)),
    MatchedArrays::I64(_, _)
    | MatchedArrays::U64(_, _)
    | MatchedArrays::I32(_, _)
    | MatchedArrays::U32(_, _)
    | MatchedArrays::U16(_, _)
    | MatchedArrays::U8(_, _) => unimplemented!(),
  }
}
