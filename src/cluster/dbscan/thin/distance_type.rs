use bincode::{Decode, Encode};
use napi_derive::napi;

#[derive(Debug, Decode, Encode)]
#[napi]
pub enum DistanceName {
  Euclidian,
  Hamming,
  Mahalanobis,
  Manhattan,
  Minkowski,
}
