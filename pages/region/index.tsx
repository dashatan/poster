import provinces from "../../utils/static/iran/provinces.json"
import { useRouter } from "next/router"
import SelectiveList, { ListItem } from "../../components/organisms/SelectiveList"
import { useCitiesQuery } from "utils/services/statics"
import FullScreenLoading from "components/layouts/FullScreenLoading"
import FullScreenModal from "components/layouts/FullScreenModal"
import FullScreenSelectiveList from "components/templates/phone/FullScreenSelectiveList"
import FullScreenError from "components/layouts/FullScreenError"
import { useAppDispatch } from "utils/hooks"
import { city } from "utils/slices/search"

export default function Region() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { data: cities, isLoading, isError } = useCitiesQuery()

  function handleClick(item: ListItem) {
    dispatch(city(item.slug))
    router.push("/")
  }

  if (isLoading) return <FullScreenLoading />

  if (isError) return <FullScreenError />

  if (cities) {
    return (
      <FullScreenSelectiveList
        heading="Provinces"
        data={cities}
        asOptionTitle="title_en"
        onChange={handleClick}
        withNavigationIcon={true}
        withSearch={true}
      />
    )
  } else return <FullScreenError />
}
