export interface ButtonProps {
    label: string;
    color?: "blue" | "red" | "green";
    onClick?: () => void;
}
const Button = (props: ButtonProps) => {
  let color 
  switch (props.color) {
  case "blue":
    color = "bg-blue-4"
    break
  case "green":
    color = "bg-green-4"
    break
        
  default:
    color = "bg-red-4"
    break
  }
  const classes = [
    "w-full",
    "h-10",
    "p-2",
    "border-2",
    color,
    "text-dark-8",
    "border-dark-6",
    "rounded-lg",
    "flex",
    "justify-around",
    "items-center",
  ]

  return (
    <div className={classes.join(" ") + ""} onClick={props.onClick}>
      {props.label}
    </div>
  )
}

export default Button
