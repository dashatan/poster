import FullScreenModal from "components/layouts/FullScreenModal"
import { beautifyWord } from "components/molecules/cards/FormFieldCard"
import SelectiveList, { ListItem } from "components/organisms/SelectiveList"
import { useRouter } from "next/router"
import { useState } from "react"
import { useAppDispatch } from "utils/hooks"
import { useCategoriesQuery } from "utils/services/statics"
import { category } from "utils/slices/search"
import PhoneTopHeader from "../headers/PhoneTopHeader"

export interface DesktopMainSideBarProps {}
export default function DesktopMainSideBar(props: DesktopMainSideBarProps) {
  const [backTrigger, setBackTrigger] = useState(false)
  const [heading, setHeading] = useState("Categories")
  const [urlChanged, setUrlChanged] = useState(false)
  const [reset, setReset] = useState(0)
  const { data } = useCategoriesQuery()
  const dispatch = useAppDispatch()

  const handleChange = (item: ListItem) => {
    dispatch(category(item.slug))
    setReset((reset) => reset + 1)
  }
  return (
    <div>
      <PhoneTopHeader
        text={beautifyWord(heading)}
        withBackBtn={urlChanged}
        onBackBtnClick={() => setBackTrigger(true)}
      />
      {data ? (
        <SelectiveList
          key={reset}
          heading={"Categories"}
          setHeading={(x: string) => setHeading(x)}
          listItems={data}
          url="categories"
          onChange={handleChange}
          backTrigger={backTrigger}
          resetBackTrigger={() => setBackTrigger(false)}
          onUrlChange={(url) => setUrlChanged(url !== "categories")}
        />
      ) : (
        <></>
      )}
    </div>
  )
}
