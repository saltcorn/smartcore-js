#[macro_use]
mod define_and_impl_macro;
#[macro_use]
mod with_distance_impl_macro;
mod f32_params;
mod f64_params;
mod i32_params;
mod i64_params;
mod u16_params;
mod u32_params;
mod u64_params;
mod u8_params;

pub use f32_params::*;
pub use f64_params::*;
pub use i32_params::*;
pub use i64_params::*;
pub use u16_params::*;
pub use u32_params::*;
pub use u64_params::*;
pub use u8_params::*;
