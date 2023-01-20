import { PhotoIcon } from "@heroicons/react/24/outline"

export default function PostCardImage({ src }: { src?: string }) {
  return (
    <div
      className="flex content-center justify-center h-full min-w-32 bg-center bg-cover rounded-md bg-light-4 dark:bg-dark-6"
      style={{ backgroundImage: `url('${src}')` }}
    >
      {!src && <PhotoIcon className="w-14 text-light-6 dark:text-dark-4" />}
    </div>
  )
}
