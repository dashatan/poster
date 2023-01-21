import { XCircleIcon } from "@heroicons/react/24/outline"
import { beautifyWord } from "./FormFieldCard"

export interface ChipProps {
  label: string
  itemKey: string | number
  onRemove: (key: string | number) => void
}

export default function Chip(props: ChipProps) {
  return (
    <span className="pl-4 pr-10 rounded-full bg-light-4 dark:bg-dark-6 relative cursor-default">
      <XCircleIcon
        className="absolute right-1 top-0.5 w-5 text-red-6 cursor-pointer"
        onClick={() => props.onRemove(props.itemKey)}
      />
      {beautifyWord(props.label)}
    </span>
  )
}
