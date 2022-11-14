export interface ThumbnailProps {
  src: string
}
export default function Thumbnail({ src }: ThumbnailProps) {
  return (
    <div
      style={{ backgroundImage: `url(${src})` }}
      className="w-full h-full bg-cover bg-center rounded-lg flex justify-center items-center"
    />
  )
}
