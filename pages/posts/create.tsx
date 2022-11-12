/* eslint-disable react-hooks/exhaustive-deps */
import { XCircleIcon } from "@heroicons/react/24/outline"
import { useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../../utils/hooks"
import {
  useCategoriesQuery,
  useUploadImagesMutation,
} from "../../utils/slices/api"
import { post } from "../../utils/slices/formData"
import Spinner from "../../components/atoms/Spinner"
import CreatePost, {
  KeyValueObj,
} from "../../components/templates/phone/CreatePost"
import FullScreenModal from "../../components/templates/phone/FullScreenModal"
import { ImageObject } from "../../components/molecules/inputs/ImageField"

export default function Create() {
  const dispatch = useAppDispatch()
  const formData = useAppSelector((state) => state.formData.post)
  const {
    data: categories,
    isLoading: catsLoading,
    error: catsErr,
  } = useCategoriesQuery()
  const [
    imgUpload,
    { isLoading: imgUploading, isSuccess: imgUploaded, isError: imgErr },
  ] = useUploadImagesMutation()

  function handleChange(formData: KeyValueObj[]) {
    dispatch(post(formData))
    window.localStorage.setItem("PostFormData", JSON.stringify(formData))
  }

  function handleImages(images: ImageObject[]) {
    const Fd = new FormData()
    images.map((img) => Fd.append("image", img.file))
    Fd.append("postId", "post1")
    imgUpload(Fd).then((res) => console.log(res))
  }

  useEffect(() => {
    const fd = window.localStorage.getItem("PostFormData")
    if (fd) dispatch(post(JSON.parse(fd)))
  }, [])

  const createPost = useMemo(() => {
    if (!categories || !formData) return
    return (
      <CreatePost
        categories={categories}
        formData={formData}
        onChange={handleChange}
        onImageChange={handleImages}
      />
    )
  }, [categories, formData])
  return (
    <div className="h-screen w-screen">
      <FullScreenModal heading="Add New Post">
        {catsLoading && (
          <div className="flex flex-col justify-center items-center h-10 mt-4">
            <Spinner />
          </div>
        )}
        {catsErr && (
          <div className="flex flex-col justify-center items-center mt-4">
            <XCircleIcon className="w-16" />
            <div className="text-xl">Some thing went wrong</div>
            utils
          </div>
        )}
        {createPost}
      </FullScreenModal>
    </div>
  )
}
