import { BsSquare, BsCheckSquare } from "react-icons/bs"
import { ReactNode, useState } from "react"

export interface CheckBoxSimpleProps {
  name: string
  value: boolean
  children: ReactNode
  onChange: (key: string, value: boolean) => void
}
export default function CheckBoxSimple({
  children,
  onChange,
  name,
  value,
}: CheckBoxSimpleProps) {
  const [isChecked, setIsChecked] = useState(value)
  function handleClick() {
    const checked = !isChecked
    onChange(name, checked)
    setIsChecked(checked)
  }
  return (
    <div className="flex items-center gap-4 my-4">
      <div onClick={handleClick}>
        {!isChecked ? (
          <BsSquare className="w-4 h-4" />
        ) : (
          <BsCheckSquare className="w-4 h-4" />
        )}
      </div>
      <div>{children}</div>
    </div>
  )
}
