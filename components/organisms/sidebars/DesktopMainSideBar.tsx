import FullScreenModal from "components/layouts/FullScreenModal"
import { beautifyWord } from "components/molecules/cards/FormFieldCard"
import SelectiveList, { ListItem } from "components/organisms/SelectiveList"
import { useState } from "react"
import { useCategoriesQuery } from "utils/services/statics"
import PhoneTopHeader from "../headers/PhoneTopHeader"

export interface DesktopMainSideBarProps {}
export default function DesktopMainSideBar(props: DesktopMainSideBarProps) {
  const [backTrigger, setBackTrigger] = useState(false)
  const [heading, setHeading] = useState("Categories")
  const { data } = useCategoriesQuery()
  return (
    <div>
      <PhoneTopHeader
        text={beautifyWord(heading)}
        withBackBtn
        onBackBtnClick={() => setBackTrigger(true)}
      />
      {data ? (
        <SelectiveList
          heading={"Categories"}
          setHeading={(x: string) => setHeading(x)}
          listItems={data}
          url="categories"
          onChange={() => {}}
          backTrigger={backTrigger}
          resetBackTrigger={() => setBackTrigger(false)}
        />
      ) : (
        <>something went wrong</>
      )}
    </div>
  )
}
