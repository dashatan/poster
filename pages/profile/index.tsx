/* eslint-disable react-hooks/exhaustive-deps */
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
import useAuth from "utils/customHooks/useAuth"
import { useEffect, useState } from "react"
import FullScreenLoading from "components/layouts/FullScreenLoading"
import Portal from "components/templates/phone/Portal"
import FullScreenModal from "components/layouts/FullScreenModal"
import useProfileLinks from "utils/customHooks/useProfileLinks"
import DesktopLayout from "components/layouts/DesktopLayout"
import DesktopTopHeader from "components/organisms/headers/DesktopTopHeader"
import GridPostsList from "components/organisms/GridPostsList"
import { useLazyPostsQuery } from "utils/services/posts"
import Post from "utils/types/Post"

const Profile = () => {
  const router = useRouter()
  const { isLoggedIn, userToken } = useAuth()
  const { isMobile } = useResponsive()
  const { isLoading, user } = useUser()
  const { links } = useProfileLinks()
  const [getPosts, { isFetching: loadingPosts }] = useLazyPostsQuery()
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    if (userToken) {
      getPosts({
        limit: 6,
        sort: "createdAt:desc",
        page,
        filters: [{ key: "userId", value: userToken }],
      }).then(({ data }) => {
        if (data) setPosts((posts) => [...posts, ...data])
      })
    }
  }, [page, userToken])

  const route = {
    profile: () => router.replace("/profile"),
    signin: () => router.replace("/profile/signin"),
    settings: () => router.push("/profile/settings"),
  }
  useEffect(() => {
    if (isLoggedIn === false) route.signin()
  }, [isLoggedIn])

  if (!user) return <FullScreenLoading />

  if (!isMobile)
    return (
      <DesktopLayout
        top={<DesktopTopHeader />}
        side={<UserProfile links={links} loading={isLoading} user={user} />}
        main={<GridPostsList posts={posts} isLoading={loadingPosts} />}
      />
    )

  return (
    <FullScreenModal heading="Profile">
      <UserProfile links={links} loading={isLoading} user={user} />
    </FullScreenModal>
  )
}

export default Profile
