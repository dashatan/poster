/* eslint-disable @next/next/no-img-element */
import { CameraIcon, UserIcon } from "@heroicons/react/24/outline"
import Button from "components/atoms/buttons/Button"
import Divider from "components/atoms/Divider"
import FullScreenLoading from "components/layouts/FullScreenLoading"
import FullScreenModal from "components/layouts/FullScreenModal"
import TextField from "components/molecules/inputs/TextField"
import { ChangeEvent, useRef } from "react"
import useLocalStorage from "utils/customHooks/useLocalStorage"
import useUser from "utils/customHooks/useUser"
import { useUserUpdateMutation } from "utils/services/auth"
import { useUploadFileMutation } from "utils/services/files"

export interface settingsProps {}
export default function Settings(props: settingsProps) {
  const { userToken } = useLocalStorage()
  const { isLoading, user } = useUser()
  const [userUpdate, { isLoading: sending }] = useUserUpdateMutation()
  const [imageUpload, { isLoading: uploading }] = useUploadFileMutation()
  const fileInput = useRef<HTMLInputElement>(null)

  const selectImage = () => fileInput.current && fileInput.current.click()
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const filesObj = e.target.files
    if (!filesObj || !userToken) return
    const files: File[] = Object.values(filesObj)

    const data = new FormData()
    data.append("image", files[0])
    data.append("userId", userToken)
    try {
      const avatar = await imageUpload({ data: "ssadad" }).unwrap()
      const updatedUser = await userUpdate({ avatar }).unwrap()
      console.log(updatedUser)
    } catch (error) {
      console.log(error)
    }
    e.target.value = ""
  }
  const submit = () => {}

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
          <div className="bg-light-4 rounded-full w-24 h-24 flex justify-center items-center overflow-hidden relative">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <UserIcon className="w-12 text-light-6" />
            )}
            <div
              onClick={selectImage}
              className="absolute bottom-0 left-0 w-full h-6 flex justify-center items-center bg-dark-10 text-dark-4 bg-opacity-40"
            >
              <CameraIcon className="w-4 h-4" />
              <input ref={fileInput} type="file" onChange={handleChange} hidden />
            </div>
          </div>
          <div className="text-sm">Change profile picture</div>
        </div>
        <Divider space="4" />
        <TextField label="name" value={user.name} />
        <Divider space="4" />
        <Button color="blue" label="update" onClick={submit} loading={sending} />
      </div>
    </FullScreenModal>
  )
}
