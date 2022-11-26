import { Icon } from "../../../utils/types"

export interface TextButtonProps {
  label: string
  Icon?: Icon
  color: "blue" | "red" | "green" | "none"
  onClick?: () => void
}
export default function TextButton({ label, Icon, color, onClick }: TextButtonProps) {
  const textColors = {
    blue: "text-blue-6 dark:text-blue-4",
    green: "text-green-6 dark:text-green-4",
    red: "text-red-6 dark:text-red-4",
    none: "",
  }
  const textColor = textColors[color]
  const classes = [textColor, "flex", "justify-center", "items-center", "gap-2"].join(" ")

  return (
    <div className={classes + ""} onClick={onClick}>
      {Icon && <Icon className="w-6 h-6" />}
      <div>{label}</div>
    </div>
  )
}
