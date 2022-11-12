export interface ButtonProps {
  label: string
  color: "blue" | "red" | "green"
  onClick?: () => void
}
export default function Button({ label, color, onClick }: ButtonProps) {
  const bgColors = {
    blue: "bg-blue-4",
    green: "bg-green-4",
    red: "bg-red-4",
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
    "justify-around",
    "items-center",
  ].join(" ")

  return (
    <div className={classes + ""} onClick={onClick}>
      {label}
    </div>
  )
}
