import { twMerge } from "tailwind-merge"
import { Icon } from "../../../utils/types"

export interface TextButtonProps {
  label: string
  Icon?: Icon
  className?: string
  IconClassName?: string
  color?: "blue" | "red" | "green" | "none"
  onClick?: () => void
}
export default function TextButton({
  label,
  Icon,
  IconClassName,
  className,
  color,
  onClick,
}: TextButtonProps) {
  const textColors = {
    blue: "text-blue-6 dark:text-blue-4",
    green: "text-green-6 dark:text-green-4",
    red: "text-red-6 dark:text-red-4",
    none: "",
  }
  const textColor = color ? textColors[color] : textColors.blue
  const colorClasses = [textColor].join(" ")

  const classes = twMerge(
    "flex items-center justify-center cursor-pointer",
    colorClasses,
    className
  )
  return (
    <div className={classes} onClick={onClick}>
      {Icon && <Icon className={IconClassName ? IconClassName : "w-6 h-6"} />}
      <div>{label}</div>
    </div>
  )
}
