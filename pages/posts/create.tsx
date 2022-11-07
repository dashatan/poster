/* eslint-disable react-hooks/exhaustive-deps */
import { XCircleIcon } from "@heroicons/react/24/outline"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useCategoriesQuery } from "../../app/slices/api"
import { post } from "../../app/slices/formData"
import Spinner from "../../components/atoms/Spinner"
import CreatePost, { KeyValueObj } from "../../components/templates/phone/CreatePost"
import FullScreenModal from "../../components/templates/phone/FullScreenModal"

export default function Create() {
  const { data, isLoading, error } = useCategoriesQuery()
  const formData = useAppSelector((state) => state.formData.post)
  const dispatch = useAppDispatch()

  function handleChange(formData: KeyValueObj[]) {
    dispatch(post(formData))
    window.localStorage.setItem("PostFormData", JSON.stringify(formData))
  }

  useEffect(() => {
    const fd = window.localStorage.getItem("PostFormData")
    if (fd) dispatch(post(JSON.parse(fd)))
  }, [])

  return (
    <div className="h-screen w-screen">
      <FullScreenModal heading="Add New Post">
        {isLoading && (
          <div className="flex flex-col justify-center items-center h-10 mt-4">
            <Spinner />
          </div>
        )}
        {error && (
          <div className="flex flex-col justify-center items-center mt-4">
            <XCircleIcon className="w-16" />
            <div className="text-xl">Some thing went wrong</div>
          </div>
        )}
        {data && <CreatePost categories={data} formData={formData} onChange={handleChange} />}
      </FullScreenModal>
    </div>
  )
}
