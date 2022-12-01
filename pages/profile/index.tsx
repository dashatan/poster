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
  const { isLoggedIn, remove } = useLocalStorage()
  const isMobile = useMobile()

  const route = {
    signin: () => router.replace("/profile/signin"),
    profile: () => router.replace("/profile"),
  }

  if (isMobile === undefined) return <FullScreenLoading />
  if (isMobile === false) return <div>desktop app</div>

  if (isLoggedIn === undefined) return <FullScreenLoading />
  if (isLoggedIn === false) {
    route.signin()
    return <FullScreenLoading />
  }

  function logOut() {
    remove("userToken")
    route.signin()
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
    { title: "Log Out", Icon: PowerIcon, onClick: logOut },
  ]
  return <UserProfile links={links} />
}

export default Profile
