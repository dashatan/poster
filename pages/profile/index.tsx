import setDarkMode from "../../utils/customHooks/useDarkMode"
import Button from "../../components/atoms/buttons/Button"
import FullScreenModal from "../../components/templates/phone/FullScreenModal"
import ListItemCard from "../../components/molecules/cards/ListItemCard"
import {
  ClockIcon,
  CogIcon,
  HeartIcon,
  InformationCircleIcon,
  KeyIcon,
  PhotoIcon,
  PowerIcon,
  UserIcon,
} from "@heroicons/react/24/outline"
import { Icon } from "../../utils/types"

interface LinkType {
  title: string
  Icon: Icon
  onClick: () => void
}

const Profile = () => {
  const topLinks: LinkType[] = [
    { title: "Posts", Icon: PhotoIcon, onClick: () => {} },
    { title: "Favorites", Icon: HeartIcon, onClick: () => {} },
    { title: "Recent Views", Icon: ClockIcon, onClick: () => {} },
    { title: "Settings", Icon: CogIcon, onClick: () => {} },
    { title: "Privacy Policy", Icon: KeyIcon, onClick: () => {} },
  ]
  const bottomLinks: LinkType[] = [
    { title: "Information", Icon: InformationCircleIcon, onClick: () => {} },
    { title: "Log Out", Icon: PowerIcon, onClick: () => {} },
  ]
  const handleDarkMode = () => {
    const darkMode = localStorage.getItem("dark_mode")
    if (darkMode !== null) setDarkMode(darkMode === "on" ? "off" : "on")
  }
  const link = (link: LinkType, index: number) => (
    <>
      <ListItemCard
        key={index}
        title={link.title}
        Icon={link.Icon}
        withNavigationIcon={true}
        onClick={link.onClick}
      />
      <div className="border-  w-full my-2 " />
    </>
  )
  return (
    <FullScreenModal heading="Profile">
      <div className="px-6 py-2 h-full overflow-y-auto hide-scrollbar">
        <div className="flex flex-col items-center justify-center gap-2 h-36">
          <div className="bg-light-4 rounded-full w-20 h-20 flex justify-center items-center">
            <UserIcon className="w-10 text-light-6" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="font-bold text-light-6">john doe</div>
            <div className="text-sm text-light-5">john-doe@gmail.com</div>
          </div>
        </div>
        <div className="h-[calc(100%_-_theme(space.36))] flex flex-col justify-start">
          <div>
            <div className="border-t w-full mb-2 mt-4 border-light-4" />
            {topLinks.map(link)}
          </div>

          <div>
            <div className="border-t w-full mb-2 mt-4 border-light-4" />
            {bottomLinks.map(link)}
          </div>
        </div>
      </div>
    </FullScreenModal>
  )
}

export default Profile
