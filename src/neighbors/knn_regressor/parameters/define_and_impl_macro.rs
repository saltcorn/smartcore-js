macro_rules! define_and_base_impl {
  (
    feature_type: $feat:ty,
    distance_type: $dist:ty,
    distance_export_type: $dist_napi:ty
  ) => {
    paste! {
        #[napi(js_name=""[<KNNRegressor $feat:upper $dist_napi  Parameters>]"")]
        #[derive(Debug, Clone)]
        pub struct [<KNNRegressor $feat:upper $dist_napi  Parameters>] {
            inner: LibKNNRegressorParameters<$feat, $dist>,
        }

        #[napi]
        impl [<KNNRegressor $feat:upper $dist_napi  Parameters>] {
            #[napi]
            pub fn with_k(&mut self, k: u32) {
                self.inner = self.inner.to_owned().with_k(k as usize)
            }

            #[napi]
            pub fn with_algorithm(&mut self, algorithm: KNNAlgorithmName) {
                self.inner = self.inner.to_owned().with_algorithm(algorithm.into());
            }

            #[napi]
            pub fn with_weight(&mut self, weight: KNNWeightFunction) {
                self.inner = self.inner.to_owned().with_weight(weight.into());
            }

            pub fn owned_inner(&self) -> LibKNNRegressorParameters<$feat, $dist> {
                self.inner.to_owned()
            }

            #[napi]
            pub fn serialize(&self) -> Result<Buffer> {
                let encoded = encode_to_vec(&self.inner, standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Buffer::from(encoded))
            }
        }

        impl AsRef<LibKNNRegressorParameters<$feat, $dist>> for [<KNNRegressor $feat:upper $dist_napi Parameters>] {
            fn as_ref(&self) -> &LibKNNRegressorParameters<$feat, $dist> {
                &self.inner
            }
        }
    }
  };
}
