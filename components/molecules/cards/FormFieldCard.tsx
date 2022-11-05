import { ReactNode } from "react"

export interface FormFieldCardProps {
    clicked?: boolean;
    children?: ReactNode;
    label: string;
    onClick?: () => void;
}

export const beautifyWord = (string: string) => {
  return string
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export default function FormFieldCard(props: FormFieldCardProps) {
  const containerClasses = ["h-16", "relative", "flex", "items-center", "group", props.clicked && "clicked"]
  const labelClasses = [
    "h-6",
    "px-2",
    "top-5",
    "group-clicked:top-0",
    "ltr:left-2",
    "rtl:right-2",
    "text-base",
    "group-clicked:text-sm",
    "pointer-events-none",
    "absolute",
    "flex",
    "justify-center",
    "items-center",
    "transition-all",
    "rounded-md",
    "bg-light-2",
    "dark:bg-dark-6",
    "text-dark-6",
    "dark:text-dark-4",
  ]
  const boxClasses = [
    "h-10",
    "px-4",
    "w-full",
    "flex",
    "justify-between",
    "items-center",
    "rounded-md",
    "cursor-pointer",
    "border-2",
    "border-dark-6",
    "dark:border-dark-4",
    "group",
    props.clicked && "clicked",
  ]
    
  return (
    <div className={containerClasses.join(" ") + ""} onClick={props.onClick}>
      <div className={labelClasses.join(" ") + ""}>{beautifyWord(props.label) || "Form Field"}</div>
      <div className={boxClasses.join(" ") + ""}>{props.children}</div>
    </div>
  )
}
