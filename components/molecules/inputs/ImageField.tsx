import { CameraIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import Spinner from "../../atoms/Spinner"
import Info from "../alerts/Info"

export interface ImageFieldProps {
  label: string
  value?: string
  type?: string
  maxFiles: number
  maxSize: number // in MB
  minDimension: [number, number]
  files?: ImageObject[]
  onChange?: (images: ImageObject[]) => void
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
  const [files, setFiles] = useState<ImageObject[]>(props.files || [])
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const validFiles = files.filter((x) => x.validation.isValid)
  const invalidFiles = files.filter((x) => !x.validation.isValid)

  const errors = {
    valid: "Image is acceptable",
    default: "Image is not acceptable",
    size: `image size could not be more than ${props.maxSize}MB`,
    dimension: `Image dimension could be larger than ${props.minDimension[0]}x${props.minDimension[1]}`,
    count: `Images count could not be more than ${props.maxFiles}`,
  }

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setLoading(true)
    const filesObj = e.target.files
    if (!filesObj) return
    const filesArr: File[] = Object.values(filesObj)
    let allowedLength = props.maxFiles - validFiles.length
    filesArr.length =
      filesArr.length < allowedLength ? filesArr.length : allowedLength
    const filePromise = filesArr.map((file) =>
      validate(file).then((res) => res)
    )
    const res = await Promise.all(filePromise)
    const newFiles = [...validFiles, ...res]
    setFiles(newFiles)
    setLoading(false)
    e.target.value = "" //empty file input
    const newValidFiles = newFiles.filter((x) => x.validation.isValid)
    props.onChange && newValidFiles && props.onChange(newValidFiles)
  }

  function handleClick() {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  function validate(file: File) {
    return new Promise<ImageObject>(async (resolve) => {
      const name = `${Math.random()}_${file.name}`
      let validation: Validation = { isValid: true, errorCode: "valid" }
      sizeError(file)
        .then((res) =>
          resolve({
            file,
            name,
            path: URL.createObjectURL(file),
            validation: res,
          })
        )
        .catch(() => {
          const reader = new FileReader()
          reader.onload = async (e) => {
            if (
              !e.target ||
              !e.target.result ||
              typeof e.target.result !== "string"
            )
              return
            const path = e.target.result
            const result = { name, file, path }
            await dimensionError(path)
              .then((res) => (validation = res))
              .catch(() => {})
            resolve({ ...result, validation })
          }
          reader.readAsDataURL(file)
        })
    })
  }

  function sizeError(file: File) {
    return new Promise<Validation>((resolve, reject) => {
      const size = Math.round(file.size / 1024)
      if (size > 1024 * props.maxSize) {
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
        if (
          image.width < props.minDimension[0] &&
          image.height < props.minDimension[1]
        ) {
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
    props.onChange && props.onChange(newFiles)
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
    ],
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
    ],
  }

  return (
    <>
      <div className="px-2 pb-4">{props.label}</div>
      <div className="flex flex-wrap gap-4 border rounded-lg p-2">
        {validFiles.length < props.maxFiles && (
          <div
            className={classes.imageContainer.join(" ")}
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
        {validFiles.map((file) => (
          <div
            key={file.name}
            className={classes.imageContainer.join(" ") + " relative"}
          >
            {file.uploaded && (
              <div
                className={classes.removeBtn.join(" ")}
                onClick={() => removeFile(file)}
              >
                <TrashIcon className="w-4 text-red-6" />
              </div>
            )}
            {file.uploading && (
              <div
                style={{ backgroundImage: `url(${file.path})` }}
                className="w-full h-full bg-cover bg-center rounded-lg flex justify-center items-center"
              >
                <div className="w-3/4 h-1 rounded-lg border border-green-6">
                  <div
                    className={`w-[${file.progress}%] h-full bg-green-6`}
                  ></div>
                </div>
              </div>
            )}
            <div
              style={{ backgroundImage: `url(${file.path})` }}
              className="w-full h-full bg-cover bg-center rounded-lg"
            />
          </div>
        ))}
        {invalidFiles.map((file) => (
          <div
            key={file.name}
            className={classes.imageContainer.join(" ") + " relative"}
          >
            <div
              className={classes.removeBtn.join(" ")}
              onClick={() => removeFile(file)}
            >
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
        type={"file"}
        accept={"image/*"}
        multiple
        className="hidden"
        onChange={handleChange}
      />
    </>
  )
}
