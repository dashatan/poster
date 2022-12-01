import { Icon } from "../../../utils/types"
import Spinner from "../Spinner"

export interface ButtonProps {
  label: string
  Icon?: Icon
  color: "blue" | "red" | "green" | "none"
  onClick?: () => void
  loading?: boolean
}
export default function Button({ label, Icon, color, onClick, loading }: ButtonProps) {
  const bgColors = {
    blue: "bg-blue-4",
    green: "bg-green-4",
    red: "bg-red-4",
    none: "",
  }

  const bgColor = bgColors[color]

  const classes = [
    "w-full",
    "h-10",
    "p-2",
    "border-2",
    bgColor,
    "text-dark-8",
    color === "none" ? "dark:text-dark-4" : "",
    "border-dark-6",
    color === "none" ? "dark:border-dark-4" : "",
    "rounded-lg",
    "flex",
    "justify-center",
    "items-center",
    "gap-2",
  ].join(" ")

  if (loading)
    return (
      <div className={classes}>
        <div className="w-6 h-6">
          <Spinner />
        </div>
      </div>
    )

  return (
    <div className={classes + ""} onClick={onClick}>
      {Icon && <Icon className="w-6 h-6" />}
      <div>{label}</div>
    </div>
  )
}
