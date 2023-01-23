import FullScreenModal from "components/layouts/FullScreenModal"
import GridPostsList from "components/organisms/GridPostsList"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useAuth from "utils/customHooks/useAuth"
import { useLazyPostsQuery } from "utils/services/posts"
import Post from "utils/types/Post"

export interface postsProps {}
export default function Posts(props: postsProps) {
  const router = useRouter()
  const { isLoggedIn, userToken } = useAuth()
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
    signin: () => router.replace("/profile/signin"),
    post: (id: string) => router.push("/posts/" + id),
  }
  useEffect(() => {
    if (isLoggedIn === false) route.signin()
  }, [isLoggedIn])
  return (
    <FullScreenModal heading="Posts">
      <GridPostsList posts={posts} isLoading={loadingPosts} onPostClick={route.post} />
    </FullScreenModal>
  )
}
