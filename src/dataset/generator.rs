use napi_derive::napi;
use smartcore::dataset::generator::{
  make_blobs as lib_make_blobs, make_circles as lib_make_circles, make_moons as lib_make_moons,
};

use super::{Datasetf32f32, Datasetf32u32};

#[napi]
pub struct Generator {}

#[napi]
impl Generator {
  #[napi]
  pub fn make_blobs(&self, num_samples: u32, num_features: u32, num_centers: u32) -> Datasetf32f32 {
    let dataset = lib_make_blobs(
      num_samples as usize,
      num_features as usize,
      num_centers as usize,
    );
    Datasetf32f32::new(dataset)
  }

  #[napi]
  pub fn make_circles(&self, num_samples: u32, factor: f64, noise: f64) -> Datasetf32u32 {
    let dataset = lib_make_circles(num_samples as usize, factor as f32, noise as f32);
    Datasetf32u32::new(dataset)
  }

  #[napi]
  pub fn make_moons(&self, num_samples: u32, noise: f64) -> Datasetf32u32 {
    let dataset = lib_make_moons(num_samples as usize, noise as f32);
    Datasetf32u32::new(dataset)
  }
}
