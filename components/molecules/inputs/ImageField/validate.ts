import { ImageObject, Validation } from "."

export default function validate(
  file: File,
  args: { maxSize: number; minDimension: [number, number] }
) {
  return new Promise<ImageObject>((resolve) => {
    const path = URL.createObjectURL(file)
    const name = `${Math.random() + Date.now()}_${file.name}`
    const validation: Validation = { isValid: true, errorCode: "valid" }
    const imgObj: ImageObject = { file, name, path, validation }
    sizeError(file, args.maxSize)
      .then((res) => resolve({ ...imgObj, validation: res }))
      .catch(() => {
        dimensionError(path, args.minDimension)
          .then((res) => resolve({ ...imgObj, validation: res }))
          .catch(() => resolve(imgObj))
      })
  })
}

function sizeError(file: File, maxSize: number) {
  return new Promise<Validation>((resolve, reject) => {
    const size = Math.round(file.size / 1024)
    if (size > 1024 * maxSize) {
      resolve({ isValid: false, errorCode: "size" })
    } else {
      reject()
    }
  })
}

function dimensionError(src: string, minDimension: [number, number]) {
  return new Promise<Validation>((resolve, reject) => {
    const image = new Image()
    image.src = src
    image.onload = async function () {
      if (image.width < minDimension[0] && image.height < minDimension[1]) {
        resolve({ isValid: false, errorCode: "dimension" })
      } else {
        reject()
      }
    }
  })
}
