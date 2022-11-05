import { ReactNode } from "react"

export default function PostCardTip({ children }: { children: ReactNode }) {
  return (
    <div className="w-full overflow-hidden text-sm text-ellipsis text-dark-6 dark:text-light-5 whitespace-nowrap">
      {children}
    </div>
  )
}
    