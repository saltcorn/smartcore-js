macro_rules! define_and_impl {
  (
    feature_type: $feat:ty,
    target_type: $target:ty,
    matrix_type: $matrix:ty,
    array_type: $array:ty,
    distance_type: $dist:ty,
    parameters_type: $params:ty,
    distance_export_type: $dist_napi:ty
  ) => {
    paste! {
        #[napi(js_name=""[<KNNRegressor $feat:upper $target:upper $dist_napi>]"")]
        #[derive(Debug)]
        pub struct [<KNNRegressor $feat:upper $target:upper $dist_napi>] {
            inner: LibKNNRegressor<$feat, $target, DenseMatrix<$feat>, Vec<$target>, $dist>,
        }

        #[napi]
        impl [<KNNRegressor $feat:upper $target:upper $dist_napi>] {
            #[napi(factory)]
            pub fn fit(x: &$matrix, y: $array, parameters: &$params) -> Result<Self> {
                let inner = LibKNNRegressor::<$feat, $target, DenseMatrix<$feat>, Vec<$target>, $dist>::fit(x, &y.to_vec(), parameters.as_ref().to_owned())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Self { inner })
            }

            #[napi]
            pub fn predict(&self, x: &$matrix) -> Result<$array> {
                let predict_result = self.inner.predict(x).map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(predict_result.into())
            }

            #[napi]
            pub fn serialize(&self) -> Result<Buffer> {
                let encoded = encode_to_vec(&self.inner, standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?;
                Ok(Buffer::from(encoded))
            }

            #[napi(factory)]
            pub fn deserialize(data: Buffer) -> Result<Self> {
                let inner = decode_from_slice::<LibKNNRegressor<$feat, $target, DenseMatrix<$feat>, Vec<$target>, $dist>, _>(data.as_ref(), standard())
                    .map_err(|e| Error::new(Status::GenericFailure, format!("{}", e)))?.0;
                Ok(Self { inner })
            }
        }
    }
  };
}
