import { ReactNode } from "react"

export interface IMageContainerProps {
  label: string
  children: ReactNode
}
export default function ImageContainer({ label, children }: IMageContainerProps) {
  return (
    <>
      <div className="px-2 pb-4">{label}</div>
      <div className="flex flex-wrap gap-4 border rounded-lg p-2">{children}</div>
    </>
  )
}
