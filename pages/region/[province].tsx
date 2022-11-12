import provinces from "../../utils/static/iran/provinces.json"
import cities from "../../utils/static/iran/cities.json"
import { useRouter } from "next/router"
import Error from "next/error"
import BottomNav from "../../components/organisms/footers/BottomNav"
import SelectiveList, {
  ListItem,
} from "../../components/templates/phone/SelectiveList"
import useNavItems from "../../utils/customHooks/useNavItems"

export default function Province() {
  const router = useRouter()
  const navItems = useNavItems()
  const { province } = router.query

  function handleClick(item: ListItem) {
    router.push("/")
  }
  const currentProvince = provinces.find((x) => x.slug === province)
  if (!currentProvince) {
    return (
      <>
        <Error statusCode={404} />
        <BottomNav navItems={navItems} />
      </>
    )
  }

  const currentCities = cities.filter(
    (x) => x.province_id === currentProvince.id
  )

  return (
    <SelectiveList
      heading={currentProvince.title_en}
      listItems={currentCities}
      asOptionTitle="slug"
      onChange={handleClick}
    />
  )
}
