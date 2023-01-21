import { ChevronDownIcon, MapPinIcon, UserIcon } from "@heroicons/react/24/outline"
import Button from "components/atoms/buttons/Button"
import TextButton, { TextButtonProps } from "components/atoms/buttons/TextButton"
import { beautifyWord } from "components/molecules/cards/FormFieldCard"
import SearchField from "components/molecules/inputs/SearchField"
import { useRouter } from "next/router"
import { twMerge } from "tailwind-merge"
import { useAppDispatch, useAppSelector } from "utils/hooks"
import { useCategoriesQuery, useCitiesQuery } from "utils/services/statics"
import { SearchSlice } from "utils/slices/search"
import { RootState } from "utils/store"
import ModalButton from "../modals/ModalButton"
import ModalSelectiveList from "../ModalSelectiveList"

const SimpleButton = (props: TextButtonProps) => {
  const classes = twMerge(
    "justify-between gap-1 p-2 hover:bg-light-3 dark:hover:bg-dark-7 rounded-md transition-all duration-300",
    props.className
  )
  return <TextButton {...props} className={classes} />
}

export interface DesktopTopHeaderProps {}
export default function DesktopTopHeader(props: DesktopTopHeaderProps) {
  const dispatch = useAppDispatch()

  const search = useAppSelector((state: RootState) => state.search)
  const { city, text } = search
  const { data: cities } = useCitiesQuery()
  const { data: categories } = useCategoriesQuery()
  const router = useRouter()
  const route = {
    region: () => router.push("/region"),
    addPost: () => router.push("/posts/create"),
    profile: () => router.push("/profile"),
  }
  return (
    <div className="flex justify-between p-2 items-center">
      <div className="flex justify-start items-center ">
        <div className="w-80 flex gap-10">
          <ModalButton
            button={
              <SimpleButton
                label={city ? beautifyWord(city) : "Region"}
                Icon={MapPinIcon}
                IconClassName="w-4 h-4"
                color="none"
              />
            }
            content={
              <ModalSelectiveList
                data={cities}
                heading="Region"
                onChange={(item) => {
                  dispatch(SearchSlice.actions.city(item.slug))
                  router.push("/")
                }}
                withSearch
              />
            }
            label="region"
          />
          <ModalButton
            button={
              <SimpleButton
                label="Categories"
                Icon={ChevronDownIcon}
                IconClassName="w-4 h-4"
                className="flex-row-reverse gap-2"
                color="none"
              />
            }
            content={
              <ModalSelectiveList
                data={categories}
                heading="Categories"
                url="categories"
                onChange={(item) => {
                  dispatch(SearchSlice.actions.category(item.slug))
                  router.push("/")
                }}
              />
            }
            label="category"
          />
        </div>
        <SearchField
          value={text}
          className="px-2 rounded-md w-80"
          placeHolder="Search"
          onChange={(e) => dispatch(SearchSlice.actions.text(e.target.value))}
        />
      </div>
      <div className="flex justify-end items-center gap-10">
        <SimpleButton
          label="Profile"
          Icon={UserIcon}
          IconClassName="w-4 h-4"
          color="none"
          onClick={route.profile}
        />

        <Button color="green" label="Add post" onClick={route.addPost} />
      </div>
    </div>
  )
}
