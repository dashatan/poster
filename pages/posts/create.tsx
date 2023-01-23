/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { XCircleIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../utils/hooks"
import { initialState, post } from "../../utils/slices/formData"
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
import useResponsive from "utils/customHooks/useResponsive"
import DesktopTopHeader from "components/organisms/headers/DesktopTopHeader"
import DesktopLayout from "components/layouts/DesktopLayout"
import Button from "components/atoms/buttons/Button"

export default function Create() {
  const router = useRouter()
  const [lsChecked, setLsChecked] = useState(false)
  const { isLoggedIn, userToken } = useAuth()
  const { isMobile } = useResponsive()
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
      userId: userToken || "",
      cityId: getVal("city"),
      categoryId: getVal("category"),
      title: getVal("title"),
      description: getVal("description"),
      images: getVal("images").split(","),
      attributes,
    }

    try {
      await createPost(data)
      dispatch(post(initialState.post))
      window.localStorage.setItem("PostFormData", JSON.stringify(initialState.post))
      router.back()
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoggedIn === "pending" || isLoggedIn === false) return <FullScreenLoading />

  if (categories.isLoading || cities.isLoading || !lsChecked) return <FullScreenLoading />

  if (categories.isError) return <FullScreenError />

  if (categories.data && cities.data && formData && lsChecked) {
    if (!isMobile) {
      return (
        <DesktopLayout
          top={<DesktopTopHeader />}
          side={
            <div className="text-xl text-light-8 flex flex-col justify-start items-center w-full h-full bg-contain bg-no-repeat bg-center">
              <img
                src={
                  process.env.NEXT_PUBLIC_SERVICES_BASE_URL +
                  "/icons/post-office-flat.jpg"
                }
                className="w-full"
              />
              <span>Add Your post to poster</span>
            </div>
          }
          main={
            <div className="flex justify-center items-center h-full w-full bg-light-2">
              <div className="overflow-y-auto h-full w-96 px-6 py-2">
                <NewPostForm
                  categories={categories.data}
                  cities={cities.data}
                  formData={formData}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  requiredFields={required}
                />
              </div>
            </div>
          }
        />
      )
    } else {
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
    }
  } else return <FullScreenError />
}
