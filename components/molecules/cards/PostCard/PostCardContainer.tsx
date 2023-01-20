import { ReactNode } from "react"

export default function PostCardContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-between w-full h-40 p-4 rounded-lg  bg-light-3 dark:bg-dark-7">
      {children}
    </div>
  )
}
