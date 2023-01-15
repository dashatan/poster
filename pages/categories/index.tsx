import FullScreenModal from "components/layouts/FullScreenModal"
import FullScreenSelectiveList from "components/templates/phone/FullScreenSelectiveList"
import { useRouter } from "next/router"
import { useState } from "react"
import Spinner from "../../components/atoms/Spinner"
import SelectiveList, { ListItem } from "../../components/organisms/SelectiveList"
import { useCategoriesQuery } from "../../utils/services/statics"

export default function Categories() {
  const [backTrigger, setBackTrigger] = useState(false)
  const router = useRouter()
  const { data } = useCategoriesQuery()
  const slugs = (router.query.slug as string[]) || []
  const lastSlug = slugs[slugs.length - 1]
  const [heading, setHeading] = useState(lastSlug || "categories")

  const handleChange = (item: ListItem) => {
    router.push("/")
  }

  const url = slugs.length > 0 ? `categories/${slugs.join("/")}` : "categories"

  return (
    <div className="h-screen w-screen bg-light-2 dark:bg-dark-6">
      {data ? (
        <FullScreenSelectiveList
          key={lastSlug}
          heading={lastSlug || "categories"}
          data={data}
          url={url}
          onChange={handleChange}
          withRouter={true}
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
