import FullScreenModal from "components/layouts/FullScreenModal"
import { beautifyWord } from "components/molecules/cards/FormFieldCard"
import PhoneTopHeader from "components/organisms/headers/PhoneTopHeader"
import DesktopModal from "components/organisms/modals/DesktopModal"
import SelectiveList, { ListItem } from "components/organisms/SelectiveList"
import { useState } from "react"
import useResponsive from "utils/customHooks/useResponsive"

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
  const { isDesktop } = useResponsive()
  if (isDesktop) {
    return (
      <DesktopModal>
        <PhoneTopHeader
          text={beautifyWord(heading)}
          withBackBtn
          onBackBtnClick={() => setBackTrigger(true)}
        />
        {props.data ? (
          <div className="w-full h-[calc(100%_-_theme(space.10))] overflow-y-auto">
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
          </div>
        ) : (
          <></>
        )}
      </DesktopModal>
    )
  }
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
