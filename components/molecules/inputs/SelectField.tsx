/* eslint-disable react-hooks/exhaustive-deps */
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import Portal from "../../templates/phone/Portal"
import SelectiveList, { ListItem } from "../../organisms/SelectiveList"
import FormFieldCard, { beautifyWord } from "../cards/FormFieldCard"
import FullScreenSelectiveList from "components/templates/phone/FullScreenSelectiveList"

export interface SelectFieldProps {
  label: string
  value?: string
  asOptionTitle?: string
  onClick?: () => void
  onChange?: (item: ListItem) => void
  options: ListItem[]
  withSearch?: boolean
  url?: string
  variant?: string
}

export default function SelectField(props: SelectFieldProps) {
  const router = useRouter()
  const queryString = router.query.select
  const slug = props.label.replace(/ /g, "-")

  function modalRouter() {
    router.push(router.asPath + `?select=${slug}`)
  }

  function handleChange(item: ListItem) {
    props.onChange && props.onChange(item)
    router.back()
  }

  const selectiveList = (
    <Portal>
      <div className="fixed top-0 left-0 h-screen w-screen">
        <FullScreenSelectiveList
          heading={props.label}
          withSearch={props.withSearch}
          asOptionTitle={props.asOptionTitle}
          data={props.options}
          url={props.url}
          onChange={handleChange}
        />
      </div>
    </Portal>
  )

  const minimalList = <div></div>

  const modal = () => {
    switch (props.variant) {
      case "minimal":
        return minimalList

      default:
        return selectiveList
    }
  }

  const showModal =
    queryString &&
    typeof queryString === "string" &&
    queryString.toLowerCase() === slug.toLowerCase()

  const displayVal = props.value ? props.value.replace(/-/g, " ") : ""

  return (
    <>
      <FormFieldCard clicked={!!props.value} label={props.label} onClick={modalRouter}>
        <div className="text-base text-dark-8 dark:text-dark-3">
          {beautifyWord(displayVal)}
        </div>
        <ChevronRightIcon className="w-6 text-dark-6 dark:text-dark-4 rtl:rotate-180" />
      </FormFieldCard>
      {showModal && modal()}
    </>
  )
}
