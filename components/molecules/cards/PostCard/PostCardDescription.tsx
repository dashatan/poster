import { ReactNode } from "react"

export default function PostCardDescription({ children }: { children: ReactNode }) {
  return (
    <div className="w-full overflow-hidden text-ellipsis text-dark-6 dark:text-light-4 whitespace-nowrap">
      {children}
    </div>
  )
}
    