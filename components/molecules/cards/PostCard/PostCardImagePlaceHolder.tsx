import { PhotoIcon } from "@heroicons/react/24/outline"

export default function PostCardImagePlaceHolder() {
  return (
    <div className="w-32 h-32 bg-light-4 dark:bg-dark-8 rounded-xl flex justify-center items-center">
      <PhotoIcon className="text-dark-6 dark:text-dark-5 w-16 h-16" />
    </div>
  )
};
