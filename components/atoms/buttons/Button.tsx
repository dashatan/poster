import { Icon } from "../../../utils/types"
import Spinner from "../Spinner"

export interface ButtonProps {
  label: string
  Icon?: Icon
  className?: string
  IconClass?: string
  color: "blue" | "red" | "green" | "none"
  onClick?: () => void
  loading?: boolean
}
export default function Button({
  label,
  Icon,
  IconClass,
  className,
  color,
  onClick,
  loading,
}: ButtonProps) {
  const bgColors = {
    blue: "bg-blue-4",
    green: "bg-green-4",
    red: "bg-red-4",
    none: "",
  }

  const bgColor = bgColors[color]

  const btnClasses = [
    "w-full",
    "h-10",
    "p-2",
    "border-2",
    "text-dark-8",
    "border-dark-6",
    "rounded-lg",
    "flex",
    "justify-center",
    "items-center",
    "gap-2",
    "cursor-pointer",
    "rounded-md",
    "transition-all",
    "duration-300",
    bgColor,
    color === "none" ? "dark:text-dark-4" : "",
    color === "none" ? "dark:border-dark-4" : "",
    color === "none" ? "hover:bg-light-3" : "",
    color === "none" ? "dark:hover:bg-dark-7" : "",
  ].join(" ")

  return (
    <div className={btnClasses + " " + className} onClick={!loading ? onClick : () => {}}>
      {loading ? (
        <div className="w-6 h-6">
          <Spinner />
        </div>
      ) : (
        <>
          {Icon && <Icon className={IconClass ? IconClass : "w-6 h-6"} />}
          <div>{label}</div>
        </>
      )}
    </div>
  )
}
