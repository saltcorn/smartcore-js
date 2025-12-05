use napi::bindgen_prelude::{
  BigInt64ArraySlice, BigUint64ArraySlice, Env, Error, Float32ArraySlice, Float64ArraySlice,
  Int32ArraySlice, Result, Status, TypedArray, TypedArrayType as NapiTypedArrayType,
  Uint16ArraySlice, Uint32ArraySlice, Uint8ArraySlice,
};
use napi_derive::napi;

use crate::typed_array::{TypedArrayType, TypedArrayWrapper};

/// Logic
/// - Integer vs Float, Output => Float
/// - Small Integer vs Large Integer, Output => Large Integer
/// - Signed vs Unsigned, Output => Signed
#[napi]
pub fn change_array_type(
  xs: TypedArray,
  to: TypedArrayType,
  env: Env,
) -> Result<TypedArrayWrapper> {
  println!("TypedArrayType: {:?}", xs.typed_array_type);
  println!("To: {to}");
  match xs.typed_array_type {
    NapiTypedArrayType::Float64 => {
      let xs_slice =
        Float64ArraySlice::from_arraybuffer(&xs.arraybuffer, xs.byte_offset, xs.arraybuffer.len())?;
      match to {
        TypedArrayType::F64 => Ok(TypedArrayWrapper::F64(xs_slice.into_typed_array(&env)?)),
        TypedArrayType::F32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f32 as num_traits::cast::NumCast>::from::<f64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F32(xs.into()))
        }
        TypedArrayType::I64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i64 as num_traits::cast::NumCast>::from::<f64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I64(xs.into()))
        }
        TypedArrayType::U64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u64 as num_traits::cast::NumCast>::from::<f64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U64(xs.into()))
        }
        TypedArrayType::I32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i32 as num_traits::cast::NumCast>::from::<f64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I32(xs.into()))
        }
        TypedArrayType::U32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u32 as num_traits::cast::NumCast>::from::<f64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U32(xs.into()))
        }
        TypedArrayType::U16 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u16 as num_traits::cast::NumCast>::from::<f64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u16"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U16(xs.into()))
        }
        TypedArrayType::U8 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u8 as num_traits::cast::NumCast>::from::<f64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u8"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U8(xs.into()))
        }
      }
    }
    NapiTypedArrayType::Float32 => {
      let xs_slice =
        Float32ArraySlice::from_arraybuffer(&xs.arraybuffer, xs.byte_offset, xs.arraybuffer.len())?;
      match to {
        TypedArrayType::F64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f64 as num_traits::cast::NumCast>::from::<f32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F64(xs.into()))
        }
        TypedArrayType::F32 => Ok(TypedArrayWrapper::F32(xs_slice.into_typed_array(&env)?)),
        TypedArrayType::I64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i64 as num_traits::cast::NumCast>::from::<f32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I64(xs.into()))
        }
        TypedArrayType::U64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u64 as num_traits::cast::NumCast>::from::<f32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U64(xs.into()))
        }
        TypedArrayType::I32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i32 as num_traits::cast::NumCast>::from::<f32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I32(xs.into()))
        }
        TypedArrayType::U32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u32 as num_traits::cast::NumCast>::from::<f32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U32(xs.into()))
        }
        TypedArrayType::U16 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u16 as num_traits::cast::NumCast>::from::<f32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u16"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U16(xs.into()))
        }
        TypedArrayType::U8 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u8 as num_traits::cast::NumCast>::from::<f32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u8"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U8(xs.into()))
        }
      }
    }
    NapiTypedArrayType::BigInt64 => {
      let xs_slice = BigInt64ArraySlice::from_arraybuffer(
        &xs.arraybuffer,
        xs.byte_offset,
        xs.arraybuffer.len(),
      )?;
      match to {
        TypedArrayType::F64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f64 as num_traits::cast::NumCast>::from::<i64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F64(xs.into()))
        }
        TypedArrayType::F32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f32 as num_traits::cast::NumCast>::from::<i64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F32(xs.into()))
        }
        TypedArrayType::I64 => Ok(TypedArrayWrapper::I64(xs_slice.into_typed_array(&env)?)),
        TypedArrayType::U64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u64 as num_traits::cast::NumCast>::from::<i64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U64(xs.into()))
        }
        TypedArrayType::I32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i32 as num_traits::cast::NumCast>::from::<i64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I32(xs.into()))
        }
        TypedArrayType::U32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u32 as num_traits::cast::NumCast>::from::<i64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U32(xs.into()))
        }
        TypedArrayType::U16 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u16 as num_traits::cast::NumCast>::from::<i64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u16"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U16(xs.into()))
        }
        TypedArrayType::U8 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u8 as num_traits::cast::NumCast>::from::<i64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u8"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U8(xs.into()))
        }
      }
    }
    NapiTypedArrayType::BigUint64 => {
      let xs_slice = BigUint64ArraySlice::from_arraybuffer(
        &xs.arraybuffer,
        xs.byte_offset,
        xs.arraybuffer.len(),
      )?;
      match to {
        TypedArrayType::F64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f64 as num_traits::cast::NumCast>::from::<u64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F64(xs.into()))
        }
        TypedArrayType::F32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f32 as num_traits::cast::NumCast>::from::<u64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F32(xs.into()))
        }
        TypedArrayType::I64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i64 as num_traits::cast::NumCast>::from::<u64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I64(xs.into()))
        }
        TypedArrayType::U64 => Ok(TypedArrayWrapper::U64(xs_slice.into_typed_array(&env)?)),
        TypedArrayType::I32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i32 as num_traits::cast::NumCast>::from::<u64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I32(xs.into()))
        }
        TypedArrayType::U32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u32 as num_traits::cast::NumCast>::from::<u64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U32(xs.into()))
        }
        TypedArrayType::U16 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u16 as num_traits::cast::NumCast>::from::<u64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u16"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U16(xs.into()))
        }
        TypedArrayType::U8 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u8 as num_traits::cast::NumCast>::from::<u64>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u8"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U8(xs.into()))
        }
      }
    }
    NapiTypedArrayType::Int32 => {
      println!("1");
      let xs_slice =
        Int32ArraySlice::from_arraybuffer(&xs.arraybuffer, xs.byte_offset, xs.arraybuffer.len())?;
      println!("2");
      match to {
        TypedArrayType::F64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f64 as num_traits::cast::NumCast>::from::<i32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F64(xs.into()))
        }
        TypedArrayType::F32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f32 as num_traits::cast::NumCast>::from::<i32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F32(xs.into()))
        }
        TypedArrayType::I64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i64 as num_traits::cast::NumCast>::from::<i32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I64(xs.into()))
        }
        TypedArrayType::U64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u64 as num_traits::cast::NumCast>::from::<i32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U64(xs.into()))
        }
        TypedArrayType::I32 => Ok(TypedArrayWrapper::I32(xs_slice.into_typed_array(&env)?)),
        TypedArrayType::U32 => {
          println!("3");
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u32 as num_traits::cast::NumCast>::from::<i32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u32"),
              ));
            };
            xs.push(v)
          }
          println!("4");
          Ok(TypedArrayWrapper::U32(xs.into()))
        }
        TypedArrayType::U16 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u16 as num_traits::cast::NumCast>::from::<i32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u16"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U16(xs.into()))
        }
        TypedArrayType::U8 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u8 as num_traits::cast::NumCast>::from::<i32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u8"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U8(xs.into()))
        }
      }
    }
    NapiTypedArrayType::Uint32 => {
      let xs_slice =
        Uint32ArraySlice::from_arraybuffer(&xs.arraybuffer, xs.byte_offset, xs.arraybuffer.len())?;
      match to {
        TypedArrayType::F64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f64 as num_traits::cast::NumCast>::from::<u32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F64(xs.into()))
        }
        TypedArrayType::F32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f32 as num_traits::cast::NumCast>::from::<u32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F32(xs.into()))
        }
        TypedArrayType::I64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i64 as num_traits::cast::NumCast>::from::<u32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I64(xs.into()))
        }
        TypedArrayType::U64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u64 as num_traits::cast::NumCast>::from::<u32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U64(xs.into()))
        }
        TypedArrayType::I32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i32 as num_traits::cast::NumCast>::from::<u32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I32(xs.into()))
        }
        TypedArrayType::U32 => Ok(TypedArrayWrapper::U32(xs_slice.into_typed_array(&env)?)),
        TypedArrayType::U16 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u16 as num_traits::cast::NumCast>::from::<u32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u16"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U16(xs.into()))
        }
        TypedArrayType::U8 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u8 as num_traits::cast::NumCast>::from::<u32>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u8"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U8(xs.into()))
        }
      }
    }
    NapiTypedArrayType::Uint16 => {
      let xs_slice =
        Uint16ArraySlice::from_arraybuffer(&xs.arraybuffer, xs.byte_offset, xs.arraybuffer.len())?;
      match to {
        TypedArrayType::F64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f64 as num_traits::cast::NumCast>::from::<u16>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F64(xs.into()))
        }
        TypedArrayType::F32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f32 as num_traits::cast::NumCast>::from::<u16>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F32(xs.into()))
        }
        TypedArrayType::I64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i64 as num_traits::cast::NumCast>::from::<u16>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I64(xs.into()))
        }
        TypedArrayType::U64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u64 as num_traits::cast::NumCast>::from::<u16>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U64(xs.into()))
        }
        TypedArrayType::I32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i32 as num_traits::cast::NumCast>::from::<u16>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I32(xs.into()))
        }
        TypedArrayType::U32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u32 as num_traits::cast::NumCast>::from::<u16>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U32(xs.into()))
        }
        TypedArrayType::U16 => Ok(TypedArrayWrapper::U16(xs_slice.into_typed_array(&env)?)),
        TypedArrayType::U8 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u8 as num_traits::cast::NumCast>::from::<u16>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u8"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U8(xs.into()))
        }
      }
    }
    NapiTypedArrayType::Uint8 => {
      let xs_slice =
        Uint8ArraySlice::from_arraybuffer(&xs.arraybuffer, xs.byte_offset, xs.arraybuffer.len())?;
      match to {
        TypedArrayType::F64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f64 as num_traits::cast::NumCast>::from::<u8>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F64(xs.into()))
        }
        TypedArrayType::F32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <f32 as num_traits::cast::NumCast>::from::<u8>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an f32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::F32(xs.into()))
        }
        TypedArrayType::I64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i64 as num_traits::cast::NumCast>::from::<u8>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I64(xs.into()))
        }
        TypedArrayType::U64 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u64 as num_traits::cast::NumCast>::from::<u8>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u64"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U64(xs.into()))
        }
        TypedArrayType::I32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <i32 as num_traits::cast::NumCast>::from::<u8>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an i32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::I32(xs.into()))
        }
        TypedArrayType::U32 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u32 as num_traits::cast::NumCast>::from::<u8>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u32"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U32(xs.into()))
        }
        TypedArrayType::U16 => {
          let mut xs = Vec::with_capacity(xs_slice.len());
          for v in xs_slice.iter() {
            let Some(v) = <u16 as num_traits::cast::NumCast>::from::<u8>(*v) else {
              return Err(Error::new(
                Status::InvalidArg,
                format!("Could not cast the value '{v}' to an u16"),
              ));
            };
            xs.push(v)
          }
          Ok(TypedArrayWrapper::U16(xs.into()))
        }
        TypedArrayType::U8 => Ok(TypedArrayWrapper::U8(xs_slice.into_typed_array(&env)?)),
      }
    }
    _ => unimplemented!(),
  }
}
