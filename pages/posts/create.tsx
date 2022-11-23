/* eslint-disable react-hooks/exhaustive-deps */
import { XCircleIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../utils/hooks"
import {
  useCategoriesQuery,
  useCitiesQuery,
  useCreatePostMutation,
} from "../../utils/slices/api"
import { post } from "../../utils/slices/formData"
import Spinner from "../../components/atoms/Spinner"
import NewPostForm from "../../components/templates/phone/NewPostForm"
import FullScreenModal from "../../components/layouts/FullScreenModal"
import { KeyValueObj } from "../../utils/types"

export default function Create(): JSX.Element {
  const [lsChecked, setLsChecked] = useState(false)
  const dispatch = useAppDispatch()
  const formData = useAppSelector((state) => state.formData.post)
  const categories = useCategoriesQuery()
  const cities = useCitiesQuery()
  const [createPost, postRes] = useCreatePostMutation()
  const required = ["category", "title", "description", "images", "city"]

  useEffect(() => {
    const fd = window.localStorage.getItem("PostFormData")
    if (fd) dispatch(post(JSON.parse(fd)))
    setLsChecked(true)
  }, [])

  function handleChange(formData: KeyValueObj[]) {
    dispatch(post(formData))
    window.localStorage.setItem("PostFormData", JSON.stringify(formData))
  }

  const getVal = (key: string) => formData.find((x) => x.key === key)?.value || ""

  function handleSubmit() {
    const exceptions = ["category", "title", "description", "images", "city"]
    const attributes = formData.filter((x) => !exceptions.includes(x.key))
    const data = {
      userId: "63793f2ae6c0220d9c076717",
      cityId: getVal("city"),
      categoryId: getVal("category"),
      title: getVal("title"),
      description: getVal("description"),
      images: getVal("images").split(","),
      attributes,
    }
    createPost({ data })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  return (
    <FullScreenModal heading="Add New Post">
      <div className="overflow-y-auto h-full hide-scrollbar px-6 py-2">
        {(categories.isLoading || cities.isLoading || !lsChecked) && (
          <div className="flex flex-col justify-center items-center h-10 mt-4">
            <Spinner />
          </div>
        )}
        {categories.isError && (
          <div className="flex flex-col justify-center items-center mt-4">
            <XCircleIcon className="w-16" />
            <div className="text-xl">Some thing went wrong</div>
            utils
          </div>
        )}
        {categories.data && cities.data && formData && lsChecked && (
          <NewPostForm
            categories={categories.data}
            cities={cities.data}
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            requiredFields={required}
          />
        )}
      </div>
    </FullScreenModal>
  )
}
