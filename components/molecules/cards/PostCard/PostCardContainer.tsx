import { ReactNode } from "react"

export interface PostCardContainerProps {
  children: ReactNode
  onClick: () => void
}

export default function PostCardContainer(props: PostCardContainerProps) {
  return (
    <div
      className="flex justify-between w-full h-40 p-4 rounded-lg  bg-light-3 dark:bg-dark-7 cursor-pointer"
      onClick={props.onClick}
    >
      {props.children}
    </div>
  )
}
