/* eslint-disable react-hooks/exhaustive-deps */
import { XCircleIcon } from "@heroicons/react/24/outline"
import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../utils/hooks"
import { useCategoriesQuery } from "../../utils/slices/api"
import { post, postImages } from "../../utils/slices/formData"
import Spinner from "../../components/atoms/Spinner"
import CreatePost, { KeyValueObj } from "../../components/templates/phone/CreatePost"
import FullScreenModal from "../../components/templates/phone/FullScreenModal"
import { ImageObject } from "../../components/molecules/inputs/ImageField"
import axios from "axios"

export interface PostObject {
  title: string
  categoryId: string
  cityId: string
  userId: string
  attributes: KeyValueObj[]
  images: string[]
}

export default function Create(): JSX.Element {
  const dispatch = useAppDispatch()
  const formData = useAppSelector((state) => state.formData.post)
  const postImages = useAppSelector((state) => state.formData.postImages)
  const [images, setImages] = useState(postImages)
  const {
    data: categories,
    isLoading: catsLoading,
    error: catsErr,
  } = useCategoriesQuery()

  function handleChange(formData: KeyValueObj[]) {
    dispatch(post(formData))
    window.localStorage.setItem("PostFormData", JSON.stringify(formData))
  }

  async function handleImages(images: ImageObject[]) {
    const baseUrl = "http://localhost:5000"
    const newImages = images.map(async (image) => {
      if (image.uploaded) return
      const Fd = new FormData()
      Fd.append("userId", "1")
      Fd.append("image", image.file)
      return await axios
        .post(baseUrl + "/upload/tmp", Fd, {
          onUploadProgress: (e) => {},
        })
        .then((res) => {
          console.log(res)
          const path = baseUrl + "/tmp/" + res.data.filename
          return { ...image, path, file: [], uploaded: true }
        })
        .catch((err) => console.log(err))
    })

    const res = await Promise.all(newImages)

    console.log(res)
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
        images={images}
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
