import Portal from "components/templates/phone/Portal"
import { ReactNode } from "react"

export interface DesktopModalProps {
  children: ReactNode
}
export default function DesktopModal(props: DesktopModalProps) {
  return (
    <Portal>
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-dark-8 bg-opacity-50">
        <div className="w-1/2 h-4/5 bg-light-2 rounded-2xl overflow-hidden dark:bg-dark-6 relative">
          {props.children}
        </div>
      </div>
    </Portal>
  )
}
