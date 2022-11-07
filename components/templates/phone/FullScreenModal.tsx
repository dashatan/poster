import { ReactNode } from "react"
import { beautifyWord } from "../../molecules/cards/FormFieldCard"
import PhoneTopHeader from "../../organisms/headers/PhoneTopHeader"

export interface FullScreenModalProps {
  heading: string
  children: ReactNode
  onBackBtnClick?: () => void
}

export default function FullScreenModal(props: FullScreenModalProps) {
  const classes = [
    "h-[calc(100%_-_theme(space.10))]",
    "px-6",
    "py-2",
    "bg-light-2",
    "dark:bg-dark-6",
    "text-dark-8",
    "dark:text-dark-4",
  ]
  return (
    <div className="h-full w-full">
      <PhoneTopHeader
        text={beautifyWord(props.heading)}
        withBackBtn
        onBackBtnClick={props.onBackBtnClick}
      />
      <div className={classes.join(" ") + ""}>{props.children}</div>
    </div>
  )
}
