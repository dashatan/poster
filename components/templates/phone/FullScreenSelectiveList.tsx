import FullScreenModal from "components/layouts/FullScreenModal"
import SelectiveList, { ListItem } from "components/organisms/SelectiveList"
import { useState } from "react"

export interface FullScreenSelectiveListProps {
  heading: string
  key?: string | number
  data: ListItem[]
  url?: string
  onChange: (item: ListItem) => void
  withRouter?: boolean
  withNavigationIcon?: boolean
  asOptionTitle?: string
  withSearch?: boolean
}
export default function FullScreenSelectiveList(props: FullScreenSelectiveListProps) {
  const [backTrigger, setBackTrigger] = useState(false)
  const [heading, setHeading] = useState(props.heading)
  return (
    <FullScreenModal heading={heading} onBackBtnClick={() => setBackTrigger(true)}>
      <SelectiveList
        key={props.key || props.heading}
        heading={props.heading}
        setHeading={(x: string) => setHeading(x)}
        listItems={props.data}
        url={props.url}
        onChange={props.onChange}
        backTrigger={backTrigger}
        resetBackTrigger={() => setBackTrigger(false)}
        withRouter={props.withRouter}
        asOptionTitle={props.asOptionTitle}
        withSearch={props.withSearch}
      />
    </FullScreenModal>
  )
}
