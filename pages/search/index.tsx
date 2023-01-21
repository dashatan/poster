/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import GridPostsList from "components/organisms/GridPostsList"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"
import { useLazyPostsQuery } from "utils/services/posts"
import Post from "utils/types/Post"
import { useAppDispatch, useAppSelector } from "../../utils/hooks"
import { text } from "../../utils/slices/search"
import { RootState } from "../../utils/store"

const Search = () => {
  const router = useRouter()
  const search = useAppSelector((state: RootState) => state.search.text)
  const city = useAppSelector((state: RootState) => state.search.city)
  const category = useAppSelector((state: RootState) => state.search.category)
  const dispatch = useAppDispatch()
  const [getPosts, { isFetching: loadingPosts }] = useLazyPostsQuery()
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState<Post[]>([])
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(text(event.target.value))
  }
  useEffect(() => {
    console.log("category changed")
    getPosts({
      limit: 6,
      sort: "createdAt:desc",
      page,
      search,
      filters: [
        { key: "cityId", value: city },
        { key: "categoryId", value: category },
      ],
    }).then(({ data }) => {
      if (data) setPosts(data)
    })
  }, [category, city, search])

  function handleMoreItems() {
    setPage((page) => page + 1)
  }

  return (
    <div>
      <div className="flex justify-start items-center w-full h-10 bg-light-4">
        <div className="p-2 cursor-pointer" onClick={router.back}>
          <ArrowLeftIcon className="h-6 w-6 rtl:rotate-180" />
        </div>
        <input
          type="text"
          autoFocus
          onChange={handleChange}
          defaultValue={search}
          className="bg-light-4 focus-visible:outline-none h-full px-4 rtl:text-right text-xl"
        />
      </div>
      <GridPostsList
        posts={posts}
        onMoreItemsClick={handleMoreItems}
        isLoading={loadingPosts}
      />
    </div>
  )
}
export default Search
