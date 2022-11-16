/* eslint-disable react-hooks/exhaustive-deps */
import { XCircleIcon } from "@heroicons/react/24/outline"
import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../utils/hooks"
import { useCategoriesQuery } from "../../utils/slices/api"
import { post } from "../../utils/slices/formData"
import Spinner from "../../components/atoms/Spinner"
import NewPostForm, { KeyValueObj } from "../../components/templates/phone/NewPostForm"
import FullScreenModal from "../../components/templates/phone/FullScreenModal"

export interface PostObject {
  title: string
  categoryId: string
  cityId: string
  userId: string
  attributes: KeyValueObj[]
  images: string[]
}

export default function Create(): JSX.Element {
  const [lsChecked, setLsChecked] = useState(false)
  const dispatch = useAppDispatch()
  const formData = useAppSelector((state) => state.formData.post)
  const {
    data: categories,
    isLoading: catsLoading,
    error: catsErr,
  } = useCategoriesQuery()

  function handleChange(formData: KeyValueObj[]) {
    dispatch(post(formData))
    window.localStorage.setItem("PostFormData", JSON.stringify(formData))
  }

  useEffect(() => {
    const fd = window.localStorage.getItem("PostFormData")
    if (fd) dispatch(post(JSON.parse(fd)))
    setLsChecked(true)
  }, [])

  const newPost = useMemo(() => {
    if (!categories || !formData || !lsChecked) return undefined
    return (
      <NewPostForm categories={categories} formData={formData} onChange={handleChange} />
    )
  }, [categories, formData, lsChecked])

  return (
    <div className="h-screen w-screen">
      <FullScreenModal heading="Add New Post">
        {catsLoading ||
          (!newPost && (
            <div className="flex flex-col justify-center items-center h-10 mt-4">
              <Spinner />
            </div>
          ))}
        {catsErr && (
          <div className="flex flex-col justify-center items-center mt-4">
            <XCircleIcon className="w-16" />
            <div className="text-xl">Some thing went wrong</div>
            utils
          </div>
        )}
        {newPost}
      </FullScreenModal>
    </div>
  )
}
