/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import FormCreator from "../../organisms/forms/FormCreator"
import Category from "../../../app/types/Category"
import SelectField from "../../molecules/inputs/SelectField"
import Attribute from "../../../app/types/Attribute"
import { useRouter } from "next/router"
import TextField from "../../molecules/inputs/TextField"
import Button from "../../atoms/buttons/Button"
import { initialState } from "../../../app/slices/formData"
import ImageField, { dataURLtoFile, Info } from "../../molecules/inputs/ImageField"

export interface KeyValueObj {
  key: string
  value: string
}

export interface CreatePostProps {
  categories: Category[]
  formData: KeyValueObj[]
  onChange: (FormData: KeyValueObj[]) => void
}

export default function CreatePost(props: CreatePostProps) {
  const initFd = [...props.formData]
  const [formData, setFormData] = useState<KeyValueObj[]>(initFd)
  const [fields, setFields] = useState<Attribute[]>([])

  const router = useRouter()

  useEffect(() => {
    if (getVal("category") === "") {
      router.push(`${router.pathname}?select=category`)
    } else {
      const cat = props.categories.find((x) => x.slug === getVal("category"))
      if (cat && cat.attributes) setFields(cat.attributes)
    }
  }, [])

  useEffect(() => {
    props.onChange(formData)
  }, [formData])

  function handleCategoryChange(category: Category) {
    const attrs = category.attributes
    setFields(attrs || [])
    setFormData(newFd(attrs || []))
    setFormData((formData) => setFdVal(formData, "category", category.slug))
  }

  function handleChange(key: string, value: string) {
    setFormData((formData) => setFdVal(formData, key, value))
  }

  async function handleImages(images: Info[]) {
    // Upload images to server and save them on disk and save the url into DB (redis or mongo)
    if (images.length > 0) {
      // console.log(URL.revokeObjectURL(images[0].path))
    }
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
    return obj ? obj.value : undefined
  }

  function getImages() {
    // get from db
    const images = getVal("images")
    if (images) {
      console.log(images)

      const f: Info[] = JSON.parse(images)
      return f.map((x) => ({ ...x, file: dataURLtoFile(x.path, x.name) }))
    }
  }

  function onSubmit() {
    // console.log(formData)
  }

  return (
    <div className="h-full overflow-y-auto py-2 hide-scrollbar">
      <SelectField
        key={`category${getVal("category")}`}
        label={"Category"}
        value={getVal("category")}
        options={props.categories}
        onChange={handleCategoryChange}
        url="categories"
      />
      {fields && <FormCreator fields={fields} formData={formData} onChange={handleChange} />}
      <div className="border-b w-full my-4" />
      <ImageField
        maxFiles={20}
        maxSize={5}
        minDimension={[600, 600]}
        label="images"
        files={getImages()}
        onChange={handleImages}
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
      <Button label="Save" color="green" onClick={onSubmit} />
    </div>
  )
}
