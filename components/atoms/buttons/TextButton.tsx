import { Icon } from "../../../utils/types"

export interface TextButtonProps {
  label: string
  Icon?: Icon
  classes?: string
  IconClass?: string
  color?: "blue" | "red" | "green" | "none"
  onClick?: () => void
}
export default function TextButton({
  label,
  Icon,
  IconClass,
  classes,
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
  const extraClasses = classes ? classes : ""
  return (
    <div
      className={
        "flex items-center justify-center cursor-pointer p-2 hover:bg-light-3 dark:hover:bg-dark-7 rounded-md transition-all duration-300" +
        colorClasses +
        " " +
        extraClasses
      }
      onClick={onClick}
    >
      {Icon && <Icon className={IconClass ? IconClass : "w-6 h-6"} />}
      <div>{label}</div>
    </div>
  )
}
