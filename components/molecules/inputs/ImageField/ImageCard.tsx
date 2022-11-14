import { XMarkIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import ProgressBar from "./ProgressBar"
import RemoveBtn from "./RemoveBtn"
import Thumbnail from "./Thumbnail"

export interface ImageCardProps {
  name: string
  thumbnail: string
  onRemove?: (name: string) => void
  oncancel?: (name: string) => void
  progress?: number
  isValid?: boolean
  isUploading?: boolean
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
  "relative",
].join(" ")

export default function ImageCard({
  name,
  thumbnail,
  onRemove,
  oncancel,
  progress,
  isValid,
  isUploading,
}: ImageCardProps) {
  return (
    <div className={box}>
      <RemoveBtn name={name} onClick={isUploading ? oncancel : onRemove} />
      <Thumbnail src={thumbnail} />
      {isUploading && <ProgressBar progress={progress || 0} />}
      {!isValid && <XMarkIcon className="w-12 text-red-6" />}
    </div>
  )
}
