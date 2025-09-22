pub mod svc;
pub mod svr;

use napi_derive::napi;
use smartcore::svm::Kernels as LibKernels;

#[napi]
pub struct Kernels {
  inner: LibKernels,
}

#[napi]
impl Kernels {
  #[napi(factory)]
  pub fn linear() -> Self {
    Self {
      inner: LibKernels::Linear,
    }
  }

  #[napi(factory)]
  pub fn rbf(gamma: f64) -> Self {
    Self {
      inner: LibKernels::rbf().with_gamma(gamma),
    }
  }

  #[napi(factory)]
  pub fn polynomial(gamma: f64, degree: f64) -> Self {
    Self {
      inner: LibKernels::polynomial()
        .with_gamma(gamma)
        .with_degree(degree),
    }
  }

  #[napi(factory)]
  pub fn sigmoid(gamma: f64, coef0: f64) -> Self {
    Self {
      inner: LibKernels::sigmoid().with_gamma(gamma).with_coef0(coef0),
    }
  }

  pub fn owned_inner(&self) -> LibKernels {
    self.inner.to_owned()
  }
}
