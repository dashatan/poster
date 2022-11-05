export interface AlertProps {
    color: "red" | "green" | "blue";
    text: string;
}
export default function Alert(props: AlertProps) {
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
  return (
    <div className={"w-full p-8 text-center rounded-lg flex justify-center items-center " + color}>
      {props.text}
    </div>
  )
}
