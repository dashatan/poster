/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import FormCreator from "../../organisms/forms/FormCreator"
import Category from "../../../utils/types/Category"
import SelectField from "../../molecules/inputs/SelectField"
import Attribute from "../../../utils/types/Attribute"
import { useRouter } from "next/router"
import TextField from "../../molecules/inputs/TextField"
import Button from "../../atoms/buttons/Button"
import { initialState } from "../../../utils/slices/formData"
import ImageField from "../../molecules/inputs/ImageField"
import { KeyValueObj } from "../../../utils/types"
import { ListItem } from "../../organisms/SelectiveList"

export interface CreatePostProps {
  categories: Category[]
  cities: ListItem[]
  formData: KeyValueObj[]
  onChange: (FormData: KeyValueObj[]) => void
  onSubmit: () => void
  requiredFields?: string[]
}

export default function NewPostForm(props: CreatePostProps) {
  const { onChange, formData, categories, onSubmit, requiredFields, cities } = props
  const [fields, setFields] = useState<Attribute[]>([])

  const router = useRouter()

  useEffect(() => {
    if (getVal("category") === "") {
      router.push(`${router.pathname}?select=category`)
    } else {
      const cat = categories.find((x) => x.slug === getVal("category"))
      if (cat && cat.attributes) setFields(cat.attributes)
    }
  }, [])

  function handleCategoryChange(category: Category) {
    const attrs = category.attributes
    setFields(attrs || [])
    const persisters = ["images"]
    let newFormData = newFd(attrs || [])
    newFormData = setFdVal(newFormData, "category", category.slug)
    for (const persister of persisters) {
      newFormData = setFdVal(newFormData, persister, getVal(persister))
    }
    onChange(newFormData)
  }

  function handleChange(key: string, value: string) {
    onChange(setFdVal(formData, key, value))
  }

  function newFd(attributes: Attribute[]) {
    const fd = [...initialState.post]
    attributes.map((attr) => {
      fd.push({ key: attr.label, value: "" })
    })
    return fd
  }

  function setFdVal(_fromData: KeyValueObj[], key: string, value: string) {
    return _fromData.map((x) => {
      if (x.key.toLowerCase() === key.toLowerCase()) {
        return { ...x, value }
      }
      return x
    })
  }

  function getVal(key: string) {
    const obj = formData.find((x) => x.key === key)
    return obj ? obj.value : ""
  }

  const validate = (keys: string[]) => {
    return new Promise((resolve, reject) => {
      const illegals = ["", undefined, null]
      const inValids = []
      for (const key of keys) {
        if (illegals.includes(getVal(key))) inValids.push(key)
      }
      if (inValids.length > 0) reject(inValids)
      else resolve("ok")
    })
  }

  function submit() {
    if (requiredFields) {
      validate(requiredFields)
        .then(() => onSubmit())
        .catch((keys) => {
          console.log("required", keys)
        })
    } else {
      onSubmit()
    }
  }

  return (
    <div className="h-full overflow-y-auto py-2 hide-scrollbar">
      <SelectField
        key={`category${getVal("category")}`}
        label={"Category"}
        value={getVal("category")}
        options={categories}
        onChange={handleCategoryChange}
        url="categories"
      />
      {fields && (
        <FormCreator fields={fields} formData={formData} onChange={handleChange} />
      )}
      <div className="border-b w-full my-4" />
      <ImageField
        label="images"
        value={getVal("images")}
        maxFiles={20}
        maxSize={5}
        minDimension={[600, 600]}
        onChange={handleChange}
      />
      <div className="border-b w-full my-4" />
      <SelectField
        key={`city_${getVal("city")}`}
        label={"City"}
        value={getVal("city")}
        options={cities}
        onChange={({ slug }) => handleChange("city", slug)}
        url=""
      />
      <TextField
        key={"title" + getVal("category")}
        value={getVal("title")}
        label="Title"
        onChange={handleChange}
      />
      <TextField
        key={"description" + getVal("category")}
        value={getVal("description")}
        label="Description"
        onChange={handleChange}
      />
      <Button label="Save" color="green" onClick={submit} />
    </div>
  )
}
