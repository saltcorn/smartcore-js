use bincode::{Decode, Encode};
use napi_derive::napi;

#[derive(Debug, Clone, PartialEq, Eq, Copy, Default, Encode, Decode)]
#[napi(string_enum)]
pub enum KMeansPredictOutputType {
  #[default]
  I32,
  I64,
}
