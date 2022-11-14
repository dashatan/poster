import { CameraIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, useRef } from "react"

export interface ImageBoxProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const box = [
  "w-16",
  "h-16",
  "p-0.5",
  "flex",
  "justify-center",
  "items-center",
  "border-2",
  "border-dashed",
  "rounded-lg",
].join(" ")

export default function ImageSelector({ onChange }: ImageBoxProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  function handleClick() {
    if (fileInputRef.current) fileInputRef.current.click()
  }
  return (
    <>
      <div className={box} onClick={handleClick}>
        <CameraIcon className="w-8" />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={onChange}
      />
    </>
  )
}
