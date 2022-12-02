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
import UserProfile, { LinkType } from "components/templates/phone/Profile"
import useLocalStorage from "utils/customHooks/useLocalStorage"
import useUser from "utils/customHooks/useUser"
import useResponsive from "utils/customHooks/useResponsive"

const Profile = () => {
  const router = useRouter()
  const { isLoggedIn, remove } = useLocalStorage()
  const { isLoading: userIsLoading, user } = useUser()
  const { isDesktop } = useResponsive()

  const route = {
    profile: () => router.replace("/profile"),
    signin: () => router.replace("/profile/signin"),
    settings: () => router.push("/profile/settings"),
  }

  if (isLoggedIn === false) route.signin()

  function logOut() {
    remove("userToken")
    route.signin()
  }

  const links: LinkType[] = [
    { title: "divider" },
    { title: "Posts", Icon: PhotoIcon, onClick: () => {} },
    { title: "Favorites", Icon: HeartIcon, onClick: () => {} },
    { title: "Recent Views", Icon: ClockIcon, onClick: () => {} },
    { title: "Settings", Icon: CogIcon, onClick: route.settings },
    { title: "Privacy Policy", Icon: KeyIcon, onClick: () => {} },
    { title: "divider" },
    { title: "Information", Icon: InformationCircleIcon, onClick: () => {} },
    { title: "Log Out", Icon: PowerIcon, onClick: logOut },
  ]

  if (isDesktop) return <div>desktop app</div>

  return <UserProfile links={links} loading={userIsLoading} user={user} />
}

export default Profile
