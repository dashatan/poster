/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useState } from "react"
import { useUploadTmpMutation } from "../../../../utils/slices/api"
import Info from "../../alerts/Info"
import ImageCard from "./ImageCard"
import ImageContainer from "./ImageContainer"
import ImageSelector from "./ImageSelctor"
import validate from "./validate"

export interface ImageFieldProps {
  value?: string
  label: string
  maxFiles: number
  maxSize: number // in MB
  minDimension: [number, number]
  onChange?: (key: string, value: string) => void
}
export interface ImageObject {
  name: string
  file?: File
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

export default function ImageField(props: ImageFieldProps) {
  const { label, maxFiles, maxSize, minDimension, onChange, value } = props

  const [files, setFiles] = useState<ImageObject[]>([])
  const [Progress, setProgress] = useState(0)
  const [CurrentFile, setCurrentFile] = useState("")
  const [uploadTmpImage] = useUploadTmpMutation()

  useEffect(() => {
    if (!value) return
    const urls = value.split(",")
    const prevImages: ImageObject[] = urls.map((url) => ({
      name: url,
      path: url,
      validation: { isValid: true, errorCode: "valid" },
      uploaded: true,
    }))
    setFiles(prevImages)
  }, [])

  const validFiles = files.filter((x) => x.validation.isValid)
  const showSelector = validFiles.length < maxFiles

  const messages = {
    valid: "Image is acceptable",
    default: "Image is not acceptable",
    size: `image size could not be more than ${maxSize}MB`,
    dimension: `Image dimension could be larger than ${minDimension[0]}x${minDimension[1]}`,
    count: `Images count could not be more than ${maxFiles}`,
  }

  const alerts = [
    { text: messages.count, variant: "info", show: true },
    { text: messages.size, variant: "error", show: hasErr("size") },
    { text: messages.size, variant: "error", show: hasErr("dimension") },
  ]

  function hasErr(errCode: string) {
    !!files.find((x) => x.validation.errorCode === errCode)
  }

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const filesObj = e.target.files
    if (!filesObj) return
    const filesArr: File[] = Object.values(filesObj)
    let allowedLength = maxFiles - validFiles.length
    filesArr.length = filesArr.length < allowedLength ? filesArr.length : allowedLength
    const filePromise = filesArr.map((file) =>
      validate(file, { maxSize, minDimension }).then((res) => res)
    )
    const res = await Promise.all(filePromise)
    const newFiles = [...validFiles, ...res]
    console.log(newFiles)
    setFiles(newFiles)
    e.target.value = "" //empty file input
    const filesToUpload = newFiles.filter(
      (x) => x.validation.isValid && x.uploaded === false
    )
    // upload(filesToUpload)
    //   .then((res) => {
    //     setFiles(res.files)
    //     onChange && onChange("images", res.images.join(","))
    //   })
    //   .catch(() => {})
  }

  async function upload(images: ImageObject[]) {
    const urls = value ? value.split(",") : []
    const newUrls = [...urls]
    const newImages: ImageObject[] = await Promise.all(
      images.map(async (image) => {
        if (!image.file) return { ...image }
        setCurrentFile(image.name)
        setProgress(0)
        const data = new FormData()
        data.append("userId", "1")
        data.append("image", image.file)
        try {
          const payload = await uploadTmpImage({
            data,
            onUploadProgress(e) {
              e.total && setProgress(Math.round((100 * e.loaded) / e.total))
            },
          }).unwrap()
          newUrls.push(payload)
          return { ...image, path: payload, file: undefined, uploaded: true }
        } catch (error) {
          return {
            ...image,
            uploaded: true,
            file: undefined,
            validation: { isValid: false, errorCode: "default" },
          }
        }
      })
    )
    return { images: newUrls, files: newImages }
  }

  function handleRemove(name: string) {}

  return (
    <>
      <ImageContainer label={label}>
        {showSelector && <ImageSelector onChange={handleChange} />}
        {files.map((file, index) => (
          <ImageCard
            key={index}
            name={file.name}
            thumbnail={file.path}
            progress={Progress}
            onRemove={handleRemove}
            isValid={file.validation.isValid}
            isUploading={file.name === CurrentFile}
          />
        ))}
      </ImageContainer>
      {alerts.map((alert, index) => alert.show && <Info key={index} {...alert} />)}
    </>
  )
}
