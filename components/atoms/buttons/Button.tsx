import { Icon } from "../../../utils/types"

export interface ButtonProps {
  label: string
  Icon?: Icon
  color: "blue" | "red" | "green" | "none"
  onClick?: () => void
}
export default function Button({ label, Icon, color, onClick }: ButtonProps) {
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
    "border-dark-6",
    "rounded-lg",
    "flex",
    "justify-center",
    "items-center",
    "gap-2",
  ].join(" ")

  return (
    <div className={classes + ""} onClick={onClick}>
      {Icon && (
        <div>
          <Icon className="w-6 h-6" />
        </div>
      )}
      <div>{label}</div>
    </div>
  )
}
