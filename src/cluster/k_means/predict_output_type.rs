use bincode::{Decode, Encode};
use napi_derive::napi;

#[derive(Debug, Clone, PartialEq, Eq, Copy, Default, Encode, Decode)]
#[napi]
pub enum PredictOutputType {
  #[default]
  I32,
  I64,
}
