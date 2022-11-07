import type { NextPage } from "next"
import { categories } from "../app/static/categories"
import { posts } from "../app/static/posts"
import PhoneLayout from "../components/layouts/PhoneLayout"
import Home from "../components/templates/phone/Home"
import { useRouter } from "next/router"
import { useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"
import { useCategoriesQuery } from "../app/slices/api"

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
