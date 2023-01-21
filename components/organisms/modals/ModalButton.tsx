import Button from "components/atoms/buttons/Button"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import DesktopModal from "./DesktopModal"

export interface ModalButtonProps {
  label?: string
  button?: ReactNode
  content?: ReactNode
}
export default function ModalButton(props: ModalButtonProps) {
  const router = useRouter()
  const queryString = router.query.modal
  const slug = props.label?.replace(/ /g, "-")

  function modalRouter() {
    router.push(router.asPath + `?modal=${slug}`)
  }

  const showModal =
    queryString &&
    typeof queryString === "string" &&
    queryString.toLowerCase() === slug?.toLowerCase()

  return (
    <>
      <div onClick={modalRouter}>
        {props.button || (
          <Button color="blue" label={props.label || ""} onClick={modalRouter} />
        )}
      </div>
      {showModal && <DesktopModal>{props.content}</DesktopModal>}
    </>
  )
}
