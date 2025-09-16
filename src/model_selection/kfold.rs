use napi_derive::napi;
use smartcore::model_selection::KFold as LibKFold;

#[napi]
pub struct KFold {
  inner: Option<LibKFold>,
}

impl Default for KFold {
  fn default() -> Self {
    Self {
      inner: Some(LibKFold::default()),
    }
  }
}

#[napi]
impl KFold {
  #[napi(constructor)]
  pub fn new() -> Self {
    Self::default()
  }

  #[napi]
  pub fn with_n_splits(&mut self, n_splits: i64) {
    if let Some(inner) = self.inner.take() {
      self.inner = Some(inner.with_n_splits(n_splits as usize))
    }
  }

  pub fn with_shuffle(&mut self, shuffle: bool) {
    if let Some(inner) = self.inner.take() {
      self.inner = Some(inner.with_shuffle(shuffle))
    }
  }

  pub fn with_seed(&mut self, seed: Option<i64>) {
    if let Some(inner) = self.inner.take() {
      self.inner = Some(inner.with_seed(seed.map(|s| s as u64)))
    }
  }

  pub fn owned_inner(&mut self) -> LibKFold {
    let mut inner_clone = LibKFold::default();
    if let Some(inner) = self.inner.take() {
      inner_clone = inner_clone
        .with_n_splits(inner.n_splits)
        .with_shuffle(inner.shuffle)
        .with_seed(inner.seed);
      self.inner = Some(inner);
    }
    inner_clone
  }

  pub fn inner(&self) -> &LibKFold {
    self.inner.as_ref().unwrap()
  }
}
