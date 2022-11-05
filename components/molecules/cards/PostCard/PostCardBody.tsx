import { ReactNode } from "react"

export default function PostCardBody({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-between flex-col w-0 h-full overflow-hidden basis-[calc(90%_-_theme(space.32))]">
      {children}
    </div>
  )
}
    