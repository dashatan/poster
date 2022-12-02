import { KeyValueObj } from "utils/types"
import Attribute, { Prop } from "../../../utils/types/Attribute"
import CheckBoxField from "../../molecules/inputs/CheckBoxField"
import NumberField from "../../molecules/inputs/NumberField"
import TextField from "../../molecules/inputs/TextField"
import Select from "./Select"

export interface FormCreatorProps {
  fields: Attribute[]
  formData: KeyValueObj[]
  onChange?: (key: string, value: string) => void
}

// This function is not related to Component Props , These are properties of form fields we received from api
export function getPropVal(props: Prop[] | undefined, name: string): string {
  const prop = props?.find((x) => x.name === name)
  return prop ? prop.value : ""
}
// TODO: memoize fields to avoid re-rendering on input changes
export default function FormCreator(props: FormCreatorProps): JSX.Element {
  const { formData, fields, onChange } = props

  function getFieldValue(key: string) {
    const obj = formData.find((x) => x.key === key)
    return obj ? obj.value : undefined
  }
  function handleChange(key: string, value: string) {
    onChange && onChange(key, value)
  }

  const selectField = (field: Attribute) => (
    <Select
      key={field.label + getFieldValue(field.label)}
      field={field}
      value={getFieldValue(field.label)}
      onChange={handleChange}
    />
  )

  const textField = ({ label }: Attribute) => (
    <TextField
      key={label}
      label={label}
      value={getFieldValue(label) || ""}
      onChange={handleChange}
    />
  )

  const numberField = ({ label, props }: Attribute) => (
    <NumberField
      key={label}
      label={label}
      value={getFieldValue(label) || ""}
      props={props}
      onChange={handleChange}
    />
  )

  const checkBoxField = ({ label }: Attribute) => (
    <CheckBoxField
      key={label}
      label={label}
      value={getFieldValue(label) || "0"}
      onChange={handleChange}
    />
  )

  interface FieldType {
    [key: string]: (attr: Attribute) => JSX.Element
  }

  const fieldTypes: FieldType = {
    select: selectField,
    text: textField,
    number: numberField,
    checkbox: checkBoxField,
  }

  const Field = (attr: Attribute) => {
    const field = fieldTypes[attr.formFieldType]
    if (!field) return
    return field(attr)
  }

  return <>{fields.map((attr) => Field(attr))}</>
}
