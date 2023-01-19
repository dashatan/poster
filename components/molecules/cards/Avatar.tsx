import { CameraIcon, UserIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useRef } from "react"

export interface AvatarProps {
  src: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
export default function Avatar(props: AvatarProps) {
  const fileInput = useRef<HTMLInputElement>(null)

  const selectImage = () => fileInput.current && fileInput.current.click()

  return (
    <div className="bg-light-4 rounded-full w-24 h-24 flex justify-center items-center overflow-hidden relative">
      {props.src ? (
        <img src={props.src} alt="" className="w-full" />
      ) : (
        <UserIcon className="w-12 text-light-6" />
      )}
      {!!props.onChange && (
        <div
          onClick={selectImage}
          className="absolute bottom-0 left-0 w-full h-6 flex justify-center items-center bg-dark-10 text-dark-4 bg-opacity-40"
        >
          <CameraIcon className="w-4 h-4" />
          <input ref={fileInput} type="file" onChange={props.onChange} hidden />
        </div>
      )}
    </div>
  )
}
