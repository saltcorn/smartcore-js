use bincode::{Decode, Encode};
use napi_derive::napi;

#[derive(Debug, Clone, PartialEq, Eq, Copy, Default, Encode, Decode)]
#[napi(string_enum)]
pub enum GaussianNBPredictOutputType {
  U64,
  #[default]
  U32,
  U16,
  U8,
}
