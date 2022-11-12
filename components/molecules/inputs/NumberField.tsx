import { ChangeEvent, useState } from "react"
import { getPropVal } from "../../organisms/forms/FormCreator"
import FormFieldCard, { beautifyWord } from "../cards/FormFieldCard"

export interface NumberFieldProps {
  label: string
  value: string
  props?: { name: string; value: string }[]
  onChange?: (key: string, value: string) => void
}

export default function NumberField({
  value,
  label,
  props,
  onChange,
}: NumberFieldProps) {
  const [inputFocused, setInputFocused] = useState(false)
  const formatter = new Intl.NumberFormat("en-US")

  const suffix = getPropVal(props, "suffix")
  const noFormat = !!parseInt(getPropVal(props, "noFormat"))
  const maxLength = parseInt(getPropVal(props, "maxLength"))

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let val = e.target.value
    const pattern = /^[,.\d]*$/g
    if (pattern.test(val)) {
      const ml = maxLength || 12
      val = val.replace(/[,.]/g, "")
      const lessThanMax = val.length <= ml
      const newVal = lessThanMax ? val : value
      if (lessThanMax) {
        onChange && onChange(label, newVal)
      }
    }
  }

  return (
    <FormFieldCard clicked={!(!inputFocused && !value)} label={label}>
      <div className="w-3/4 text-base text-dark-8 dark:text-dark-3">
        <input
          className="bg-light-2 dark:bg-dark-6 h-8 w-full focus-visible:outline-none"
          value={
            value ? (noFormat ? value : formatter.format(parseInt(value))) : ""
          }
          onChange={handleChange}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
      </div>
      <div className="w-1/4 text-sm flex justify-end whitespace-nowrap text-dark-8 dark:text-dark-3">
        {suffix ? beautifyWord(suffix) : ""}
      </div>
    </FormFieldCard>
  )
}
