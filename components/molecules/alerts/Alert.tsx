export interface AlertProps {
  color: "red" | "green" | "blue"
  text: string
}
export default function Alert(props: AlertProps) {
  const color = "bg-" + props.color + "-4"
  const classes = [
    "w-full",
    "p-8",
    "text-center",
    "rounded-lg",
    "flex",
    "justify-center",
    "items-center",
    color,
  ].join(" ")

  return <div className={classes}>{props.text}</div>
}
