macro_rules! define_and_base_impl {
  (
    feature_type: $feat:ty,
    distance_type: $dist:ty,
    distance_export_type: $dist_napi:ty
  ) => {
    paste! {
        #[napi(js_name=""[<KNNClassifier $feat:upper $dist_napi  Parameters>]"")]
        #[derive(Debug, Clone)]
        pub struct [<KNNClassifier $feat:upper $dist_napi  Parameters>] {
            inner: LibKNNClassifierParameters<$feat, $dist>,
        }

        #[napi]
        impl [<KNNClassifier $feat:upper $dist_napi  Parameters>] {
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

            pub fn owned_inner(&self) -> LibKNNClassifierParameters<$feat, $dist> {
                self.inner.to_owned()
            }

            #[napi]
            pub fn serialize(&self) -> Result<Buffer> {
                let encoded = encode_to_vec(&self.inner, standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Buffer::from(encoded))
            }
        }

        impl AsRef<LibKNNClassifierParameters<$feat, $dist>> for [<KNNClassifier $feat:upper $dist_napi Parameters>] {
            fn as_ref(&self) -> &LibKNNClassifierParameters<$feat, $dist> {
                &self.inner
            }
        }
    }
  };
}
