import { TrashIcon } from "@heroicons/react/24/outline"

export interface RemoveBtnProps {
  onClick: () => void
}

const rmBtn = [
  "w-6",
  "h-6",
  "bg-light-2",
  "absolute",
  "-top-2",
  "-right-2",
  "flex",
  "justify-center",
  "items-center",
  "rounded-full",
].join(" ")

export default function RemoveBtn({ onClick }: RemoveBtnProps) {
  return (
    <div className={rmBtn} onClick={() => onClick()}>
      <TrashIcon className="w-4 text-red-6" />
    </div>
  )
}
