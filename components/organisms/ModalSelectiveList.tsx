import { beautifyWord } from "components/molecules/cards/FormFieldCard"
import { useState } from "react"
import PhoneTopHeader from "./headers/PhoneTopHeader"
import SelectiveList, { ListItem } from "./SelectiveList"

export interface ModalSelectiveListProps {
  data?: ListItem[]
  heading: string
  url?: string
  onChange?: (item: ListItem) => void
  withSearch?: boolean
}
export default function ModalSelectiveList(props: ModalSelectiveListProps) {
  const [backTrigger, setBackTrigger] = useState(false)
  const [heading, setHeading] = useState(props.heading)
  const { data } = props
  return (
    <>
      <PhoneTopHeader
        text={beautifyWord(heading)}
        withBackBtn
        onBackBtnClick={() => setBackTrigger(true)}
      />
      {data ? (
        <div className="w-full h-[calc(100%_-_theme(space.10))] overflow-y-auto">
          <SelectiveList
            heading={props.heading}
            setHeading={(x: string) => setHeading(x)}
            listItems={data}
            url={props.url}
            onChange={props.onChange}
            backTrigger={backTrigger}
            resetBackTrigger={() => setBackTrigger(false)}
            withSearch={props.withSearch}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
