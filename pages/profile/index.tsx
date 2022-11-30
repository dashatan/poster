import {
  ClockIcon,
  CogIcon,
  HeartIcon,
  InformationCircleIcon,
  KeyIcon,
  PhotoIcon,
  PowerIcon,
} from "@heroicons/react/24/outline"
import FullScreenLoading from "../../components/layouts/FullScreenLoading"
import UserProfile, { LinkType } from "../../components/templates/phone/Profile"
import useLocalStorage from "../../utils/customHooks/useLocalStorage"
import useMobile from "../../utils/customHooks/useMobile"
import SignIn from "./signin"

const Profile = () => {
  const { isLoggedIn } = useLocalStorage()
  const isMobile = useMobile()

  if (isMobile === undefined) return <></>
  if (isMobile === false) return <div>desktop app</div>

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
  if (isMobile) return <UserProfile links={links} />
}

export default Profile
