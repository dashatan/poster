import { LinkType } from "components/templates/phone/Profile"
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
import useUser from "./useUser"
import useResponsive from "utils/customHooks/useResponsive"

export default function useProfileLinks() {
  const router = useRouter()
  const { logout } = useUser()
  const { isMobile } = useResponsive()
  const route = {
    profile: () => router.replace("/profile"),
    signin: () => router.replace("/profile/signin"),
    settings: () => router.push("/profile/settings"),
    posts: () => router.push("/profile/posts"),
  }
  function logOut() {
    logout().then(() => route.signin())
  }
  const links: LinkType[] = [
    { title: "divider" },
    { title: "Posts", Icon: PhotoIcon, onClick: isMobile ? route.posts : route.profile },
    { title: "Favorites", Icon: HeartIcon, onClick: () => {} },
    { title: "Recent Views", Icon: ClockIcon, onClick: () => {} },
    { title: "Settings", Icon: CogIcon, onClick: route.settings },
    { title: "Privacy Policy", Icon: KeyIcon, onClick: () => {} },
    { title: "divider" },
    { title: "Information", Icon: InformationCircleIcon, onClick: () => {} },
    { title: "Log Out", Icon: PowerIcon, onClick: logOut },
  ]
  return { links }
}
