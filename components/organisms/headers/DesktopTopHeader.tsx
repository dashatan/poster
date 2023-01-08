import { ChevronDownIcon, MapPinIcon } from "@heroicons/react/24/outline"
import TextButton from "components/atoms/buttons/TextButton"
import SearchField from "components/molecules/inputs/SearchField"

export interface DesktopTopHeaderProps {}
export default function DesktopTopHeader(props: DesktopTopHeaderProps) {
  return (
    <div className="flex justify-between p-2 items-center">
      <div className="flex justify-start items-center gap-10 ">
        <TextButton
          label="Tehran"
          Icon={MapPinIcon}
          IconClass="w-4 h-4"
          classes="justify-between gap-1"
          color="none"
        />
        <TextButton
          label="Categories"
          Icon={ChevronDownIcon}
          IconClass="w-4 h-4"
          classes="justify-between flex-row-reverse gap-2"
          color="none"
        />

        <SearchField value="" />
      </div>
      <div className="flex justify-end items-center gap-2"></div>
    </div>
  )
}
// <Start>
//  <CityButton/>
//  <Categories/>
//  <Search/>
// </Start>
// <End>
//  <Profile/>
//  <AddPost/>
// </End>
