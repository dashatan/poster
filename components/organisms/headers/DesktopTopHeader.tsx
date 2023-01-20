import { ChevronDownIcon, MapPinIcon, UserIcon } from "@heroicons/react/24/outline"
import Button from "components/atoms/buttons/Button"
import TextButton, { TextButtonProps } from "components/atoms/buttons/TextButton"
import { beautifyWord } from "components/molecules/cards/FormFieldCard"
import SearchField from "components/molecules/inputs/SearchField"
import { twMerge } from "tailwind-merge"
import { useAppSelector } from "utils/hooks"
import { RootState } from "utils/store"

const SimpleButton = (props: TextButtonProps) => {
  const classes = twMerge(
    "justify-between gap-1 p-2 hover:bg-light-3 dark:hover:bg-dark-7 rounded-md transition-all duration-300",
    props.className
  )
  return <TextButton {...props} className={classes} />
}

export interface DesktopTopHeaderProps {}
export default function DesktopTopHeader(props: DesktopTopHeaderProps) {
  const city = useAppSelector((state: RootState) => state.search.city)
  return (
    <div className="flex justify-between p-2 items-center">
      <div className="flex justify-start items-center ">
        <div className="w-80 flex gap-10">
          <SimpleButton
            label={city ? beautifyWord(city) : "Region"}
            Icon={MapPinIcon}
            IconClassName="w-4 h-4"
            color="none"
          />
          <SimpleButton
            label="Categories"
            Icon={ChevronDownIcon}
            IconClassName="w-4 h-4"
            className="flex-row-reverse gap-2"
            color="none"
          />
        </div>
        <SearchField value="" className="px-2 rounded-md w-80" placeHolder="Search" />
      </div>
      <div className="flex justify-end items-center gap-10">
        <SimpleButton
          label="Profile"
          Icon={UserIcon}
          IconClassName="w-4 h-4"
          color="none"
        />
        <Button color="green" label="Add post" />
      </div>
    </div>
  )
}
