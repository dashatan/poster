import { CameraIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import Spinner from "../../atoms/Spinner"
import Info from "../alerts/Info"

export interface ImageFieldProps {
  label: string
  maxFiles: number
  maxSize: number // in MB
  minDimension: [number, number]
  files: ImageObject[]
  onChange: (images: ImageObject[]) => void
}

export interface ImageObject {
  name: string
  file: File
  path: string
  validation: Validation
  uploaded?: boolean
  uploading?: boolean
  progress?: boolean
}

export interface Validation {
  isValid: boolean
  errorCode: "default" | "size" | "dimension" | "valid" | "count"
}

export function dataURLtoFile(dataUrl: string, filename: string) {
  let arr = dataUrl.split(",")
  let mime = arr[0].match(/:(.*?);/)
  let type = mime ? mime[1] : "jpeg"
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type })
}

export default function ImageField(props: ImageFieldProps) {
  const { label, maxFiles, maxSize, minDimension, onChange } = props

  const [files, setFiles] = useState<ImageObject[]>(props.files || [])
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const validFiles = files.filter((x) => x.validation.isValid)
  const invalidFiles = files.filter((x) => !x.validation.isValid)

  const errors = {
    valid: "Image is acceptable",
    default: "Image is not acceptable",
    size: `image size could not be more than ${maxSize}MB`,
    dimension: `Image dimension could be larger than ${minDimension[0]}x${minDimension[1]}`,
    count: `Images count could not be more than ${maxFiles}`,
  }

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setLoading(true)
    const filesObj = e.target.files
    if (!filesObj) return
    const filesArr: File[] = Object.values(filesObj)
    let allowedLength = maxFiles - validFiles.length
    filesArr.length = filesArr.length < allowedLength ? filesArr.length : allowedLength
    const filePromise = filesArr.map((file) => validate(file).then((res) => res))
    const res = await Promise.all(filePromise)
    const newFiles = [...validFiles, ...res]
    setFiles(newFiles)
    setLoading(false)
    e.target.value = "" //empty file input
    const newValidFiles = newFiles.filter((x) => x.validation.isValid)
    onChange && newValidFiles && onChange(newValidFiles)
  }

  function handleClick() {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  function validate(file: File) {
    return new Promise<ImageObject>((resolve) => {
      const path = URL.createObjectURL(file)
      const name = `${Math.random()}_${file.name}`
      const validation: Validation = { isValid: true, errorCode: "valid" }
      const imgObj: ImageObject = { file, name, path, validation }
      sizeError(file)
        .then((res) => resolve({ ...imgObj, validation: res }))
        .catch(() => {
          dimensionError(path)
            .then((res) => resolve({ ...imgObj, validation: res }))
            .catch(() => resolve(imgObj))
        })
    })
  }

  function sizeError(file: File) {
    return new Promise<Validation>((resolve, reject) => {
      const size = Math.round(file.size / 1024)
      if (size > 1024 * maxSize) {
        resolve({ isValid: false, errorCode: "size" })
      } else {
        reject()
      }
    })
  }

  function dimensionError(src: string) {
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

  function removeFile(file: ImageObject) {
    const newFiles = files.filter((x) => x.name !== file.name)
    setFiles(newFiles)
    onChange && onChange(newFiles)
  }

  const classes = {
    imageContainer: [
      "w-16",
      "h-16",
      "p-0.5",
      "flex",
      "justify-center",
      "items-center",
      "border-2",
      "border-dashed",
      "rounded-lg",
    ].join(" "),
    removeBtn: [
      "w-6",
      "h-6",
      "bg-light-2",
      "absolute",
      "-top-2",
      "-right-2",
      "flex",
      "justify-center",
      "items-center",
      "rounded-full",
    ].join(" "),
  }

  return (
    <>
      <div className="px-2 pb-4">{label}</div>
      <div className="flex flex-wrap gap-4 border rounded-lg p-2">
        {validFiles.length < maxFiles && (
          <div
            className={classes.imageContainer}
            onClick={!loading ? handleClick : undefined}
          >
            {loading ? (
              <div className="w-8 h-8">
                <Spinner />
              </div>
            ) : (
              <CameraIcon className="w-8" />
            )}
          </div>
        )}
        {validFiles.map((file, index) => (
          <div key={index} className={classes.imageContainer + " relative"}>
            {file.uploaded && (
              <div className={classes.removeBtn} onClick={() => removeFile(file)}>
                <TrashIcon className="w-4 text-red-6" />
              </div>
            )}

            {file.uploading && (
              <div
                style={{ backgroundImage: `url(${file.path})` }}
                className="w-full h-full bg-cover bg-center rounded-lg flex justify-center items-center"
              >
                <div className="w-3/4 h-1 rounded-lg border border-green-6">
                  <div className={`w-[${file.progress}%] h-full bg-green-6`}></div>
                </div>
              </div>
            )}

            <div
              style={{ backgroundImage: `url(${file.path})` }}
              className="w-full h-full bg-cover bg-center rounded-lg flex justify-center items-center"
            >
              {file.uploading && (
                <div className="w-8 h-8">
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        ))}
        {invalidFiles.map((file, index) => (
          <div key={index} className={classes.imageContainer + " relative"}>
            <div className={classes.removeBtn} onClick={() => removeFile(file)}>
              <TrashIcon className="w-4 text-red-6" />
            </div>
            <div
              style={{ backgroundImage: `url(${file.path})` }}
              className="w-full h-full bg-cover bg-center rounded-lg flex justify-center items-center"
            >
              <XMarkIcon className="w-12 text-red-6" />
            </div>
          </div>
        ))}
      </div>
      <div>
        <Info text={errors.count} variant="simple" />
        {!!invalidFiles.find((x) => x.validation.errorCode === "size") && (
          <Info text={errors.size} variant="error" />
        )}
        {invalidFiles.find((x) => x.validation.errorCode === "dimension") && (
          <Info text={errors.dimension} variant="error" />
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleChange}
      />
    </>
  )
}
