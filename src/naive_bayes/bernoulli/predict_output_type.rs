use bincode::{Decode, Encode};
use napi_derive::napi;

#[derive(Debug, Clone, PartialEq, Eq, Copy, Default, Encode, Decode)]
#[napi(string_enum)]
pub enum BernoulliNBPredictOutputType {
  #[default]
  U32,
  U64,
}
