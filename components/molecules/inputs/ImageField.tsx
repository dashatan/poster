/* eslint-disable @next/next/no-img-element */
import { CameraIcon, TrashIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useRef, useState } from "react"
import Spinner from "../../atoms/Spinner"
import Portal from "../../templates/phone/Portal"
import Alert from "../alerts/Alert"
import Expire from "../alerts/Expire"

export interface ImageFieldProps {
  label: string
  value?: string
  type?: string
  max?: number
  onChange?: (images: Info[]) => void
}

export interface Info {
  name: string
  file: File
  path: string
  validation: Validation
}

export interface Validation {
  isValid: boolean
  errorCode: number
}

export default function ImageField(props: ImageFieldProps) {
  const [files, setFiles] = useState<Info[]>([])
  const [alert, setAlert] = useState({ show: false, message: "" })
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const max = props.max || 8

  const errors = {
    1: "Image is not acceptable",
    2: "image size should not be larger than 5 MB",
    3: "Image dimension should be larger than 600x600",
    4: "images shouldn't larger than 5MB",
    5: "images shouldn't larger than 5MB",
    6: "images shouldn't larger than 5MB",
  }

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setLoading(true)
    const filesObj = e.target.files
    if (!filesObj) return
    const filesArr: File[] = Object.values(filesObj)
    let allowedLength = max - files.length
    filesArr.length = filesArr.length < allowedLength ? filesArr.length : allowedLength
    const filePromise = filesArr.map((file) => validate(file).then((res) => res))
    const res = await Promise.all(filePromise)
    const newFiles = [...files, ...res]
    newFiles.map((file) => {
      !file.validation.isValid && setAlert({ show: true, message: errors[1] })
    })

    setFiles(newFiles.filter((x) => x.validation.isValid))

    e.target.value = "" //empty file input

    setLoading(false)
  }

  function handleClick() {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  function validate(file: File) {
    return new Promise<Info>((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (!e.target || !e.target.result || typeof e.target.result !== "string") return

        const name = `${Math.random()}_${file.name}`
        const path = e.target.result
        const result = { name, file, path }

        checkSize(file).catch((res) => resolve({ ...result, validation: res }))
        checkDimension(e).catch((res) => resolve({ ...result, validation: res }))

        const validation = { isValid: true, errorCode: 0 }
        resolve({ ...result, validation })
      }
      reader.readAsDataURL(file)
    })
  }

  function checkSize(file: File) {
    return new Promise<Validation>((_resolve, reject) => {
      const size = Math.round(file.size / 1024)

      if (size > 1024 * 5) {
        reject({ isValid: false, errorCode: 1 })
      }
    })
  }

  function checkDimension(e: ProgressEvent<FileReader>) {
    return new Promise<Validation>((_resolve, reject) => {
      if (!e.target || !e.target.result || typeof e.target.result !== "string") return

      const result = e.target.result
      const image = new Image()

      image.src = result

      image.onload = function () {
        if (image.width < 600 && image.height < 600) {
          reject({ isValid: false, errorCode: 2 })
        }
      }
    })
  }

  function removeFile(file: Info) {
    setFiles((files) => files.filter((x) => x.name !== file.name))
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
  }

  return (
    <>
      <div className="px-2 pb-4">{props.label}</div>
      <div className="flex flex-wrap gap-4 border rounded-lg p-2">
        {files.length < max && (
          <div className={classes.imageContainer.join(" ")} onClick={handleClick}>
            {loading ? (
              <div className="w-8 h-8">
                <Spinner />
              </div>
            ) : (
              <CameraIcon className="w-8" />
            )}
          </div>
        )}
        {files.map((file) => (
          <div key={file.name} className={classes.imageContainer.join(" ") + " relative"}>
            <div
              className="w-6 h-6 bg-light-2 absolute -top-2 -right-2 flex justify-center items-center rounded-full"
              onClick={() => removeFile(file)}
            >
              <TrashIcon className="w-4 text-red-6" />
            </div>
            <div
              style={{ backgroundImage: `url(${file.path})` }}
              className="w-full h-full bg-cover bg-center rounded-lg"
            />
          </div>
        ))}
      </div>
      <input
        ref={fileInputRef}
        type={"file"}
        accept={"image/*"}
        multiple
        className="hidden"
        onChange={handleChange}
      />
      {alert.show && (
        <Portal>
          <Expire
            delay={6000}
            key={Math.random()}
            onExpire={() => setAlert({ show: false, message: "" })}
          >
            <Alert color="red" text={alert.message} />
          </Expire>
        </Portal>
      )}
    </>
  )
}
