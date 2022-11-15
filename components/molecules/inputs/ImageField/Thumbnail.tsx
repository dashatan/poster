import { ReactNode } from "react"

export interface ThumbnailProps {
  src: string
  children: ReactNode
}
export default function Thumbnail({ src, children }: ThumbnailProps) {
  return (
    <div
      className="w-full h-full bg-cover bg-center rounded-lg flex justify-center items-center"
      style={{ backgroundImage: `url(${src})` }}
    >
      {children}
    </div>
  )
}
