use napi_derive::napi;
use smartcore::dataset::generator::{
  make_blobs as lib_make_blobs, make_circles as lib_make_circles, make_moons as lib_make_moons,
};

use super::{DatasetF64F64, DatasetF64I32};

#[napi]
pub struct Generator {}

#[napi]
impl Generator {
  #[napi]
  pub fn make_blobs(&self, num_samples: u32, num_features: u32, num_centers: u32) -> DatasetF64F64 {
    lib_make_blobs(
      num_samples as usize,
      num_features as usize,
      num_centers as usize,
    )
    .into()
  }

  #[napi]
  pub fn make_circles(&self, num_samples: u32, factor: f64, noise: f64) -> DatasetF64I32 {
    lib_make_circles(num_samples as usize, factor as f32, noise as f32).into()
  }

  #[napi]
  pub fn make_moons(&self, num_samples: u32, noise: f64) -> DatasetF64I32 {
    lib_make_moons(num_samples as usize, noise as f32).into()
  }
}
