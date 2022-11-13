/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react"
import FormCreator from "../../organisms/forms/FormCreator"
import Category from "../../../utils/types/Category"
import SelectField from "../../molecules/inputs/SelectField"
import Attribute from "../../../utils/types/Attribute"
import { useRouter } from "next/router"
import TextField from "../../molecules/inputs/TextField"
import Button from "../../atoms/buttons/Button"
import { initialState } from "../../../utils/slices/formData"
import ImageField, { dataURLtoFile, ImageObject } from "../../molecules/inputs/ImageField"

export interface KeyValueObj {
  key: string
  value: string
}

export interface CreatePostProps {
  categories: Category[]
  images: ImageObject[]
  formData: KeyValueObj[]
  onChange: (FormData: KeyValueObj[]) => void
  onImageChange: (images: ImageObject[]) => void
}

export default function CreatePost(props: CreatePostProps) {
  const { onChange, formData, categories, onImageChange, images } = props
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
    const newFormData = setFdVal(newFd(attrs || []), "category", category.slug)
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

  function onSubmit() {}

  const titleField = useMemo(() => {
    return (
      <TextField
        key={"title" + getVal("category")}
        value={getVal("title")}
        label="Title"
        onChange={handleChange}
      />
    )
  }, [getVal("title")])

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
        maxFiles={20}
        maxSize={5}
        minDimension={[600, 600]}
        label="images"
        files={images}
        onChange={onImageChange}
      />
      {titleField}
      <TextField
        key={"description" + getVal("category")}
        value={getVal("description")}
        label="Description"
        onChange={handleChange}
      />
      <Button label="Save" color="green" onClick={onSubmit} />
    </div>
  )
}
