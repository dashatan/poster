import { useRouter } from "next/router"
import {
  HomeIcon,
  ListBulletIcon,
  MoonIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline"
import useDarkMode from "./useDarkMode"

export default function useNavItems() {
  const router = useRouter()
  const darkMode = useDarkMode()

  const route = (url: string) => {
    router.push(url)
  }

  const handleDarkMode = () => darkMode.toggle()

  const navItems = [
    {
      Icon: HomeIcon,
      title: "Home",
      onClick: () => route("/"),
    },
    {
      Icon: ListBulletIcon,
      title: "Categories",
      onClick: () => route("/categories"),
    },
    {
      Icon: PlusIcon,
      title: "NewPost",
      onClick: () => route("/posts/create"),
    },
    {
      Icon: MoonIcon,
      title: "Dark mode",
      onClick: handleDarkMode,
    },
    {
      Icon: UserIcon,
      title: "Profile",
      onClick: () => route("/profile"),
    },
  ]
  return navItems
}
