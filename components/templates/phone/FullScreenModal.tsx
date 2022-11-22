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
    "w-full",
    "relative",
    "bg-light-2",
    "dark:bg-dark-6",
    "text-dark-8",
    "dark:text-dark-4",
  ].join(" ")
  return (
    <div className="h-screen w-screen">
      <PhoneTopHeader
        text={beautifyWord(props.heading)}
        withBackBtn
        onBackBtnClick={props.onBackBtnClick}
      />
      <div className={classes + ""}>{props.children}</div>
    </div>
  )
}
