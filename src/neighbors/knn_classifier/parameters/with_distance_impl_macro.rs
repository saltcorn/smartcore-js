macro_rules! with_distance_impl {
  (
    self_parameters_export_type: $self_napi:ty,
    other_parameters_export_type: $other_napi:ty,
    other_distance_export_type: $other_dist_napi:ty
  ) => {
    paste! {
        #[napi]
        impl $self_napi {
            #[napi]
            #[allow(non_snake_case)]
            pub fn [<with_distance_ $other_dist_napi>](
                &self,
                distance: &$other_dist_napi,
            ) -> $other_napi {
                let inner = self.inner.to_owned().with_distance(distance.owned_inner());
                $other_napi {
                    inner
                }
            }
        }
    }
  };
}
