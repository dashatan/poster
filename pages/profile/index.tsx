import {
  ClockIcon,
  CogIcon,
  HeartIcon,
  InformationCircleIcon,
  KeyIcon,
  PhotoIcon,
  PowerIcon,
} from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import FullScreenLoading from "../../components/layouts/FullScreenLoading"
import UserProfile, { LinkType } from "../../components/templates/phone/Profile"
import useLocalStorage from "../../utils/customHooks/useLocalStorage"
import useMobile from "../../utils/customHooks/useMobile"

const Profile = () => {
  const router = useRouter()
  const { isLoggedIn } = useLocalStorage()
  const isMobile = useMobile()
  if (isMobile === undefined) return <FullScreenLoading />
  if (isMobile === false) return <div>desktop app</div>

  if (isLoggedIn === undefined) return <FullScreenLoading />
  if (isLoggedIn === false) {
    router.replace("/profile/signin")
    return <FullScreenLoading />
  }

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
