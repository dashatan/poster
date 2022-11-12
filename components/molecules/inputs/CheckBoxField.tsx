import { CheckCircleIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import CircleIcon from "../../atoms/icons/CircleIcon"
import FormFieldCard from "../cards/FormFieldCard"

export interface CheckBoxFieldProps {
  label: string
  value: string
  onChange: (key: string, value: string) => void
}

function CheckBoxField({ value, label, onChange }: CheckBoxFieldProps) {
  function handleClick() {
    onChange(label, value === "0" ? "1" : "0")
  }

  return (
    <FormFieldCard label={label} onClick={handleClick}>
      <div />
      {value === "1" ? (
        <CheckCircleIcon className="w-6 text-dark-6 dark:text-dark-4" />
      ) : (
        <CircleIcon className="w-6 p-0.5" />
      )}
    </FormFieldCard>
  )
}

export default CheckBoxField
