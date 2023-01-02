import provinces from "../../utils/static/iran/provinces.json"
import { useRouter } from "next/router"
import SelectiveList, { ListItem } from "../../components/templates/phone/SelectiveList"
import { useCitiesQuery } from "utils/services/statics"
import FullScreenLoading from "components/layouts/FullScreenLoading"
import FullScreenModal from "components/layouts/FullScreenModal"

export default function Region() {
  const router = useRouter()
  const { data: cities, isLoading, isError } = useCitiesQuery()

  function handleClick(item: ListItem) {
    // router.push(`${router.asPath}/${item.slug}`)
    router.push("/")
  }

  if (isLoading) {
    return <FullScreenLoading />
  }

  if (isError) {
    return <FullScreenModal heading="Error">Something went wrong</FullScreenModal>
  }

  if (cities) {
    return (
      <SelectiveList
        heading="Provinces"
        listItems={cities}
        asOptionTitle="title_en"
        onChange={handleClick}
        withNavigationIcon={true}
      />
    )
  } else {
    return <FullScreenModal heading="Error">Something went wrong</FullScreenModal>
  }
}
