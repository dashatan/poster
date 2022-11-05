import { ChangeEvent, useState } from "react"
import FormFieldCard from "../cards/FormFieldCard"

export interface TextFieldProps {
    label: string;
    value?: string;
    type?: string;
    onChange?: (key: string, value: string) => void;
}

export default function TextField(props: TextFieldProps) {
  const [value, setValue] = useState(props.value || "")
  const [inputFocused, setInputFocused] = useState(false)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
    props.onChange && props.onChange(props.label, e.target.value)
  }

  return (
    <FormFieldCard clicked={!(!inputFocused && !value)} label={props.label}>
      <div className="text-base text-dark-8 dark:text-dark-3 w-full">
        <input
          type={"text"}
          className="bg-light-2 dark:bg-dark-6 h-8 w-full focus-visible:outline-none"
          defaultValue={value}
          onChange={handleChange}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
      </div>
    </FormFieldCard>
  )
}
