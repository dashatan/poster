import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
export interface InfoProps {
  text: string
  variant: "info" | "error" | "success" | "simple"
}
export default function Info(props: InfoProps) {
  let bg = "bg-dark-3"
  if (props.variant === "error") bg = "bg-red-3"
  if (props.variant === "info") bg = "bg-blue-3"
  if (props.variant === "success") bg = "bg-green-3"
  return (
    <div
      className={
        "text-sm text-dark-8 dark:text-dark-4 flex items-center gap-2 rounded-lg p-2 my-2 " + bg
      }
    >
      <ExclamationCircleIcon className="w-6" /> {props.text}
    </div>
  )
}