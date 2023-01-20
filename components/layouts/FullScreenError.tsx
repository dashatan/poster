import { XCircleIcon } from "@heroicons/react/24/outline"
import FullScreenModal from "./FullScreenModal"

export interface FullScreenErrorProps {}
export default function FullScreenError(props: FullScreenErrorProps) {
  return (
    <FullScreenModal heading="Loading">
      <div className="w-full h-20 flex justify-center items-center ">
        <div className="flex flex-col justify-center items-center mt-4">
          <XCircleIcon className="w-12 dark:text-red-4 text-red-6" />
          <div className="text-lg dark:text-red-4 text-red-6">Some thing went wrong</div>
        </div>
      </div>
    </FullScreenModal>
  )
}
