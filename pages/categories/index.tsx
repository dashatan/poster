import { useRouter } from "next/router"
import { useCategoriesQuery } from "../../app/slices/api"
import Spinner from "../../components/atoms/Spinner"
import SelectiveList, { ListItem } from "../../components/templates/phone/SelectiveList"

export default function Categories() {
  const router = useRouter()
  const { data } = useCategoriesQuery()
  const slugs = (router.query.slug as string[]) || []
  const lastSlug = slugs[slugs.length - 1]

  const handleChange = (item: ListItem) => {
    router.push("/")
  }

  const url = slugs.length > 0 ? `categories/${slugs.join("/")}` : "categories"

  return (
    <div className="h-screen w-screen bg-light-2 dark:bg-dark-6">
      {data ? (
        <SelectiveList
          key={lastSlug}
          heading={lastSlug || "categories"}
          listItems={data}
          url={url}
          onChange={handleChange}
          withRouter
        />
      ) : (
        <div className="w-full h-full flex justify-center">
          <div className="w-10 h-10 mt-10">
            <Spinner />
          </div>
        </div>
      )}
    </div>
  )
}
