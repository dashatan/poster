import { ReactNode } from "react"

export default function PostCardContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-between w-full p-4 rounded-lg h-40 bg-light-3 dark:bg-dark-7">
      {children}
    </div>
  )
}
    