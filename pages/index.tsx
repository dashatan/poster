import type { NextPage } from "next"
import { posts } from "../utils/static/posts"
import PhoneLayout from "../components/layouts/PhoneLayout"
import Home from "../components/templates/phone/Home"
import { useRouter } from "next/router"
import { useAppDispatch, useAppSelector } from "../utils/hooks"
import { RootState } from "../utils/store"
import { useCategoriesQuery } from "../utils/slices/api"

const HomePage: NextPage = () => {
  const router = useRouter()

  const search = useAppSelector((state: RootState) => state.search)
  const { data } = useCategoriesQuery()

  return (
    <PhoneLayout>
      <Home
        categories={data?.filter((x) => x.parentSlug === "categories")}
        posts={posts}
        placeHolders={{
          selectPlaceHolder: "tabriz",
          searchPlaceHolder: "",
        }}
        onIconCardClick={(item) => router.push(`/categories/${item.title}`)}
      />
    </PhoneLayout>
  )
}

export default HomePage
