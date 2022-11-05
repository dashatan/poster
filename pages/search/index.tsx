import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import { ChangeEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { text } from "../../app/slices/search"
import { RootState } from "../../app/store"

const Search = () => {
  const router = useRouter()
  const search = useAppSelector((state: RootState)=> state.search)
  const dispatch = useAppDispatch()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(text(event.target.value))
  }
  return (
    <div className="flex justify-start items-center w-full h-10 bg-light-4">
      <div className="p-2 cursor-pointer" onClick={router.back}>
        <ArrowLeftIcon className="h-6 w-6 rtl:rotate-180" />
      </div>
      <input
        type="text"
        autoFocus
        onChange={handleChange}
        defaultValue={search.text}
        className="bg-light-4 focus-visible:outline-none h-full px-4 rtl:text-right text-xl"
      />
    </div>
  )
}
export default Search
