/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useMemo, useState } from "react"
import {
  useRemoveTmpFileMutation,
  useUploadTmpFileMutation,
} from "../../../../utils/slices/api"
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
  const [currentFile, setCurrentFile] = useState("")
  const [uploadTmp] = useUploadTmpFileMutation()
  const [removeTmp] = useRemoveTmpFileMutation()
  const cf = useMemo(() => {
    return currentFile
  }, [currentFile])
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

    setFiles(newFiles)
    e.target.value = "" //empty file input
    const filesToUpload = newFiles.filter((x) => x.validation.isValid && !x.uploaded)
    sequentialUpload(filesToUpload).then(() => {
      setProgress(0)
      setCurrentFile("")
    })
  }

  async function sequentialUpload(images: ImageObject[]) {
    const urls = value ? value.split(",") : []
    const newUrls = [...urls]
    for (const image of images) {
      if (!image.file) return
      setCurrentFile(image.name)
      setProgress(0)
      const data = new FormData()
      data.append("expire", (1000 * 60 * 60 * 24).toString())
      data.append("image", image.file)
      const onUploadProgress = (e: any) => {
        setProgress(Math.round(100 * e.progress))
      }
      const validation: Validation = { isValid: false, errorCode: "default" }
      let imgObj: ImageObject = {
        ...image,
        validation,
        uploaded: true,
        file: undefined,
      }
      try {
        const payload = await uploadTmp({ data, onUploadProgress }).unwrap()
        const path = payload
        const validation: Validation = { isValid: true, errorCode: "valid" }
        imgObj = { ...imgObj, path, validation }
        newUrls.push(path)
        onChange && onChange("images", newUrls.join(","))
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }

      setFiles((files) => files.map((file) => (file.name === image.name ? imgObj : file)))
    }
  }

  async function handleRemove(path: string) {
    await removeTmp(path)
      .unwrap()
      .then(() => {
        const images = value?.split(",").filter((x) => x !== path)
        setFiles((files) => files.filter((x) => x.path !== path))
        if (images && onChange) onChange("images", images.join(","))
      })
      .catch(() => {})
  }

  return (
    <>
      <ImageContainer label={label}>
        {showSelector && <ImageSelector onChange={handleChange} />}
        {files.map((file, index) => (
          <ImageCard
            key={index}
            path={file.path}
            progress={Progress}
            onRemove={handleRemove}
            isValid={file.validation.isValid}
            isUploading={file.name === cf}
          />
        ))}
      </ImageContainer>
      {alerts.map((alert, index) => alert.show && <Info key={index} {...alert} />)}
    </>
  )
}
