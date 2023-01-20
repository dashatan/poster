import { ReactNode } from "react"

export default function PostCardTitle({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-12 mb-2 overflow-hidden text-lg font-semibold leading-6 text-dark-7 dark:text-light-3 text-ellipsis">
      {children}
    </div>
  )
}
