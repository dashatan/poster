import {
  ClockIcon,
  CogIcon,
  HeartIcon,
  InformationCircleIcon,
  KeyIcon,
  PhotoIcon,
  PowerIcon,
} from "@heroicons/react/24/outline"
import { useContext } from "react"
import FullScreenLoading from "../../components/layouts/FullScreenLoading"
import UserProfile, { LinkType } from "../../components/templates/phone/Profile"
import LocalStorageContext from "../../utils/contexts/LocalStorageContext"
import SignIn from "./signin"

const Profile = () => {
  const ls = useContext(LocalStorageContext)
  const isLoggedIn = ls.isLoggedIn

  if (isLoggedIn === undefined) return <FullScreenLoading />
  if (isLoggedIn === false) return <SignIn />

  const links: LinkType[] = [
    { title: "divider" },
    { title: "Posts", Icon: PhotoIcon, onClick: () => {} },
    { title: "Favorites", Icon: HeartIcon, onClick: () => {} },
    { title: "Recent Views", Icon: ClockIcon, onClick: () => {} },
    { title: "Settings", Icon: CogIcon, onClick: () => {} },
    { title: "Privacy Policy", Icon: KeyIcon, onClick: () => {} },
    { title: "divider" },
    { title: "Information", Icon: InformationCircleIcon, onClick: () => {} },
    { title: "Log Out", Icon: PowerIcon, onClick: () => {} },
  ]
  return <UserProfile links={links} />
}

export default Profile
