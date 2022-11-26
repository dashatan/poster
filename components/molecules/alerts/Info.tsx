import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
export interface InfoProps {
  text: string
  variant: string
}
export default function Info({ variant, text }: InfoProps) {
  let bg = "bg-dark-3"
  if (variant === "error") bg = "bg-red-3"
  if (variant === "info") bg = "bg-blue-3"
  if (variant === "success") bg = "bg-green-3"
  return (
    <div
      className={"text-sm text-dark-8 flex items-center gap-2 rounded-lg p-2 my-2 " + bg}
    >
      <ExclamationCircleIcon className="w-6" /> {text}
    </div>
  )
}
