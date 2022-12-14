import { ChangeEvent } from "react"
import { twMerge } from "tailwind-merge"

export interface SearchFieldProps {
  name?: string
  id?: string
  value: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  placeHolder?: string
  className?: string
}
export default function SearchField(props: SearchFieldProps) {
  return (
    <div
      className={twMerge(
        "flex justify-between py-2 bg-light-2 dark:bg-dark-6",
        props.className
      )}
    >
      <input
        className="focus-visible:outline-none h-full w-full bg-light-2 dark:bg-dark-6 text-dark-8 dark:text-dark-4"
        type="text"
        defaultValue={props.value}
        name={props.name}
        id={props.id}
        placeholder={props.placeHolder}
        onChange={props.onChange}
      />
    </div>
  )
}
