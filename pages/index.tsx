import type { NextPage } from "next"
import PhoneLayout from "../components/layouts/PhoneLayout"
import Home from "../components/templates/phone/Home"
import { useRouter } from "next/router"
import { RootState } from "../utils/store"
import { useCategoriesQuery } from "../utils/services/statics"
import useResponsive from "utils/customHooks/useResponsive"
import DesktopLayout from "components/layouts/DesktopLayout"
import DesktopTopHeader from "components/organisms/headers/DesktopTopHeader"
import DesktopMainSideBar from "components/organisms/sidebars/DesktopMainSideBar"
import { useEffect, useState } from "react"
import GridPostsList from "components/organisms/GridPostsList"
import { beautifyWord } from "components/molecules/cards/FormFieldCard"
import { useAppSelector } from "utils/hooks"
import { useLazyPostsQuery, usePostsQuery } from "utils/services/posts"
import Post from "utils/types/Post"

const HomePage: NextPage = () => {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState<Post[]>([])
  const [getPosts] = useLazyPostsQuery()
  const search = useAppSelector((state: RootState) => state.search.text)
  const city = useAppSelector((state: RootState) => state.search.city)
  const category = useAppSelector((state: RootState) => state.search.category)
  const { data: categories } = useCategoriesQuery()
  const { isLoading, isMobile } = useResponsive()

  useEffect(() => {
    console.log(city)
  }, [city])

  useEffect(() => {
    getPosts({
      limit: 6,
      sort: "createdAt:desc",
      page,
      filters: [
        { key: "cityId", value: city },
        { key: "categoryId", value: category },
      ],
    }).then(({ data }) => {
      if (data) setPosts((posts) => [...posts, ...data])
    })
  }, [page])

  function handleMoreItems() {
    setPage((page) => page + 1)
  }

  if (isLoading) {
    return <></>
  } else if (!isMobile) {
    return (
      <DesktopLayout
        main={<GridPostsList posts={posts} />}
        top={<DesktopTopHeader />}
        side={<DesktopMainSideBar />}
      />
    )
  } else {
    return (
      <PhoneLayout>
        <Home
          categories={categories?.filter((x) => x.parentSlug === "categories")}
          posts={posts || []}
          placeHolders={{
            selectPlaceHolder: city ? beautifyWord(city) : "Region",
            searchPlaceHolder: search || "Search in posts",
          }}
          onIconCardClick={(item) => router.push(`/categories/${item.title}`)}
          onMoreItemsClick={handleMoreItems}
        />
      </PhoneLayout>
    )
  }
}

export default HomePage
