/* eslint-disable @next/next/no-img-element */
import { CameraIcon, UserIcon } from "@heroicons/react/24/outline"
import Button from "components/atoms/buttons/Button"
import Divider from "components/atoms/Divider"
import FullScreenLoading from "components/layouts/FullScreenLoading"
import FullScreenModal from "components/layouts/FullScreenModal"
import Avatar from "components/molecules/cards/Avatar"
import TextField from "components/molecules/inputs/TextField"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import useAuth from "utils/customHooks/useAuth"
import useLocalStorage from "utils/customHooks/useLocalStorage"
import useUser from "utils/customHooks/useUser"
import { useUserUpdateMutation } from "utils/services/auth"
import { useUploadFileMutation } from "utils/services/files"

export interface settingsProps {}
export default function Settings(props: settingsProps) {
  const router = useRouter()
  const { userToken } = useAuth()
  const { isLoading, user } = useUser()
  const [userUpdate, { isLoading: sending }] = useUserUpdateMutation()
  const [imageUpload, { isLoading: uploading }] = useUploadFileMutation()
  const [avatar, setAvatar] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    if (user) {
      setAvatar(user.avatar)
      setName(user.name)
    }
  }, [user])

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const filesObj = e.target.files
    if (!filesObj || !userToken) return
    const files: File[] = Object.values(filesObj)

    const data = new FormData()
    data.append("image", files[0])
    data.append("userId", userToken)
    try {
      const avatar = await imageUpload({ data }).unwrap()
      await userUpdate({ avatar }).unwrap()
      setAvatar(avatar)
    } catch (error) {
      console.log(error)
    }
    e.target.value = ""
  }
  const submit = async () => {
    if (user && name !== user.name) {
      await userUpdate({ name }).unwrap()
    }
    router.back()
  }

  if (isLoading) return <FullScreenLoading />
  if (!user)
    return (
      <FullScreenModal heading="Settings">
        <div>Something went wrong</div>
      </FullScreenModal>
    )

  return (
    <FullScreenModal heading="Settings">
      <div className="p-6 h-full overflow-y-auto hide-scrollbar flex flex-col justify-start gap-4">
        <div className="flex flex-col justify-center items-center gap-2">
          <Avatar src={avatar} onChange={handleChange} />
          <div className="text-sm">Change profile picture</div>
        </div>
        <Divider space="4" />
        <TextField label="name" value={name} onChange={(key, value) => setName(value)} />
        <Divider space="4" />
        <Button color="blue" label="update" onClick={submit} loading={sending} />
      </div>
    </FullScreenModal>
  )
}
