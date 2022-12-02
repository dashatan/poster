/* eslint-disable @next/next/no-img-element */
import { CameraIcon, UserIcon } from "@heroicons/react/24/outline"
import Divider from "components/atoms/Divider"
import FullScreenLoading from "components/layouts/FullScreenLoading"
import FullScreenModal from "components/layouts/FullScreenModal"
import TextField from "components/molecules/inputs/TextField"
import useUser from "utils/customHooks/useUser"

export interface settingsProps {}
export default function Settings(props: settingsProps) {
  const { isLoading, user } = useUser()
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
            <div className="absolute bottom-0 left-0 w-full h-6 flex justify-center items-center bg-dark-10 text-dark-4 bg-opacity-40">
              <CameraIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-sm">Change profile picture</div>
        </div>
        <Divider space="4" />
        <TextField label="name" value={user.name} />
      </div>
    </FullScreenModal>
  )
}
