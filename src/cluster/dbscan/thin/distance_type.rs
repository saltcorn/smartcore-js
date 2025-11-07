use std::fmt::Display;

use bincode::{Decode, Encode};
use napi_derive::napi;

#[derive(Debug, Decode, Encode, Clone, Copy)]
#[napi]
pub enum DistanceName {
  Euclidian,
  Hamming,
  Mahalanobis,
  Manhattan,
  Minkowski,
}

impl Display for DistanceName {
  fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
    match &self {
      Self::Euclidian => f.write_str("Euclidian"),
      Self::Hamming => f.write_str("Hamming"),
      Self::Mahalanobis => f.write_str("Mahalanobis"),
      Self::Manhattan => f.write_str("Manhattan"),
      Self::Minkowski => f.write_str("Minkowski"),
    }
  }
}
