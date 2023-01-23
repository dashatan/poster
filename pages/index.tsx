/* eslint-disable react-hooks/exhaustive-deps */
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
import { useEffect, useRef, useState } from "react"
import GridPostsList from "components/organisms/GridPostsList"
import { beautifyWord } from "components/molecules/cards/FormFieldCard"
import { useAppSelector } from "utils/hooks"
import { useLazyPostsQuery } from "utils/services/posts"
import Post from "utils/types/Post"
import usePrevious from "utils/customHooks/usePrevious"

const HomePage: NextPage = () => {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState<Post[]>([])
  const [getPosts, { isFetching: loadingPosts }] = useLazyPostsQuery()
  const search = useAppSelector((state: RootState) => state.search.text)
  const city = useAppSelector((state: RootState) => state.search.city)
  const category = useAppSelector((state: RootState) => state.search.category)
  const { data: categories } = useCategoriesQuery()
  const { isLoading, isMobile } = useResponsive()
  const prevPage = usePrevious(page)

  useEffect(() => {
    const pageChanged = prevPage !== page
    !pageChanged && setPage(1)
    getPosts({
      limit: isMobile ? 6 : 12,
      sort: "createdAt:desc",
      page: pageChanged ? page : 1,
      filters: [
        { key: "cityId", value: city },
        { key: "categoryId", value: category },
      ],
    }).then(({ data }) => {
      if (data) setPosts((posts) => (pageChanged ? [...posts, ...data] : [...data]))
    })
  }, [page, category, city, search])

  function handleMoreItems() {
    setPage((page) => page + 1)
  }

  if (isLoading) {
    return <></>
  } else if (!isMobile) {
    return (
      <DesktopLayout
        main={
          <GridPostsList
            posts={posts}
            onMoreItemsClick={handleMoreItems}
            isLoading={loadingPosts}
            onPostClick={(id) => router.push("/posts/" + id)}
          />
        }
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
          loadingPosts={loadingPosts}
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
