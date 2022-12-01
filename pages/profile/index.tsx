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
import { useEffect, useState } from "react"
import UserProfile, { LinkType } from "../../components/templates/phone/Profile"
import useLocalStorage from "../../utils/customHooks/useLocalStorage"
import useMobile from "../../utils/customHooks/useMobile"
import { useLazyUserQuery, User } from "../../utils/services/auth"

const Profile = () => {
  const router = useRouter()
  const { isLoggedIn, remove, userToken } = useLocalStorage()
  const isMobile = useMobile()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User>()
  const [userTrigger] = useLazyUserQuery()

  useEffect(() => {
    if (typeof userToken !== "string") return
    async function getUser(userToken: string) {
      try {
        const data = await userTrigger(userToken, true).unwrap()
        setUser(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getUser(userToken)
  }, [userToken])

  const route = {
    signin: () => router.replace("/profile/signin"),
    profile: () => router.replace("/profile"),
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
    { title: "Settings", Icon: CogIcon, onClick: () => {} },
    { title: "Privacy Policy", Icon: KeyIcon, onClick: () => {} },
    { title: "divider" },
    { title: "Information", Icon: InformationCircleIcon, onClick: () => {} },
    { title: "Log Out", Icon: PowerIcon, onClick: logOut },
  ]

  if (isMobile === false) return <div>desktop app</div>

  return <UserProfile links={links} loading={loading} user={user} />
}

export default Profile
