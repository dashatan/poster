import { TrashIcon } from "@heroicons/react/24/outline"

export interface RemoveBtnProps {
  name: string
  onClick?: (name: string) => void
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
export default function RemoveBtn({ name, onClick }: RemoveBtnProps) {
  return (
    <div className={rmBtn} onClick={() => onClick && onClick(name)}>
      <TrashIcon className="w-4 text-red-6" />
    </div>
  )
}
