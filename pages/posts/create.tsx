/* eslint-disable react-hooks/exhaustive-deps */
import { XCircleIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../utils/hooks"
import { post } from "../../utils/slices/formData"
import Spinner from "../../components/atoms/Spinner"
import NewPostForm from "../../components/templates/phone/NewPostForm"
import FullScreenModal from "../../components/layouts/FullScreenModal"
import { KeyValueObj } from "../../utils/types"
import { useCreatePostMutation } from "../../utils/services/posts"
import { useCategoriesQuery, useCitiesQuery } from "../../utils/services/statics"
import useAuth from "utils/customHooks/useAuth"
import FullScreenLoading from "components/layouts/FullScreenLoading"
import { useRouter } from "next/router"
import FullScreenError from "components/layouts/FullScreenError"

export default function Create() {
  const router = useRouter()
  const [lsChecked, setLsChecked] = useState(false)
  const { isLoggedIn } = useAuth()
  const dispatch = useAppDispatch()
  const formData = useAppSelector((state) => state.formData.post)
  const categories = useCategoriesQuery()
  const cities = useCitiesQuery()
  const [createPost] = useCreatePostMutation()
  const required = ["category", "title", "description", "images", "city"]

  useEffect(() => {
    const fd = window.localStorage.getItem("PostFormData")
    if (fd) dispatch(post(JSON.parse(fd)))
    setLsChecked(true)
  }, [])

  useEffect(() => {
    if (isLoggedIn === false) router.replace("/profile/signin")
  }, [isLoggedIn])

  function handleChange(formData: KeyValueObj[]) {
    dispatch(post(formData))
    window.localStorage.setItem("PostFormData", JSON.stringify(formData))
  }

  const getVal = (key: string) => formData.find((x) => x.key === key)?.value || ""

  async function handleSubmit() {
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

    try {
      const payload = await createPost(data).unwrap()
      console.log(payload)
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoggedIn === "pending" || isLoggedIn === false) return <FullScreenLoading />

  if (categories.isLoading || cities.isLoading || !lsChecked) return <FullScreenLoading />

  if (categories.isError) return <FullScreenError />

  if (categories.data && cities.data && formData && lsChecked) {
    return (
      <FullScreenModal heading="Add New Post">
        <div className="overflow-y-auto h-full hide-scrollbar px-6 py-2">
          <NewPostForm
            categories={categories.data}
            cities={cities.data}
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            requiredFields={required}
          />
        </div>
      </FullScreenModal>
    )
  } else return <FullScreenError />
}
