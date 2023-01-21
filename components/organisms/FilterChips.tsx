import Chip from "components/molecules/cards/Chip"
import { useAppDispatch, useAppSelector } from "utils/hooks"
import { SearchSlice } from "utils/slices/search"
import { ActionObj, StringObj } from "utils/types"

export interface FilterChipsProps {}

export default function FilterChips(props: FilterChipsProps) {
  const filters = useAppSelector((state) => state.search)
  const dispatch = useAppDispatch()
  function handleRemove(key: string | number) {
    const action = (SearchSlice.actions as unknown as ActionObj)[key]
    action && dispatch(action(""))
  }
  const filtersExist =
    Object.keys(filters).filter((x) => !!(filters as unknown as StringObj)[x]).length > 0

  if (!filtersExist) return <></>

  return (
    <div className="w-full p-2 flex gap-2">
      {Object.keys(filters).map((key, i) => {
        const val = (filters as unknown as StringObj)[key]
        if (val) {
          return <Chip key={i} itemKey={key} label={val} onRemove={handleRemove} />
        }
      })}
    </div>
  )
}
