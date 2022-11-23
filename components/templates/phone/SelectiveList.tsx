import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import ViewportList from "react-viewport-list"
import Fuse from "fuse.js"
import ListItemCard from "../../molecules/cards/ListItemCard"
import SearchField from "../../molecules/inputs/SearchField"
import FullScreenModal from "../../layouts/FullScreenModal"

export interface ListItem {
  title: string
  slug: string
  parentSlug: string
  icon?: string
}

export interface SelectiveListProps {
  heading: string
  listItems: ListItem[]
  onChange?: (item: ListItem) => void
  onBackBtnClick?: () => void
  withNavigationIcon?: boolean
  asOptionTitle?: string
  withSearch?: boolean
  withRouter?: boolean
  url?: string
}

export default function SelectiveList(props: SelectiveListProps) {
  const router = useRouter()
  const ref = useRef(null)
  const [url, setUrl] = useState(props.url || "")
  const [items, setItems] = useState<ListItem[]>([])
  const [searchedItems, setSearchedItems] = useState<Fuse.FuseResult<ListItem>[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const isRoot = props.url ? url === props.url : url === ""
  const fuse = new Fuse(
    props.listItems.filter((x) => !hasChildren(x)),
    { keys: ["title"] }
  )

  useEffect(() => {
    function getItems() {
      const slugs = url.split("/")
      const lastSlug = slugs[slugs.length - 1]
      const newItems = props.listItems.filter((x) => x.parentSlug === lastSlug)
      return newItems
    }
    setItems(getItems())
  }, [isRoot, props.listItems, url])

  function handleClick(item: ListItem) {
    if (hasChildren(item)) {
      const newUrl = `${url}/${item.slug}`
      setUrl(newUrl)
      props.withRouter && router.push(router.asPath + "/" + item.slug)
    } else {
      props.onChange && props.onChange(item)
    }
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setSearchTerm(value)
    let s = fuse.search(value)
    setSearchedItems(s)
  }

  function handleBackBtn() {
    if (isRoot) return router.back()
    setUrl((url) => url.substring(0, url.lastIndexOf("/")))
    props.withRouter && router.back()
  }

  function hasChildren(item: ListItem) {
    const children = props.listItems.filter((x) => x.parentSlug === item.slug)
    return children.length > 0
  }

  function getHeading() {
    if (isRoot) return props.heading
    const slugs = url.split("/")
    const lastSlug = slugs[slugs.length - 1]
    const item = props.listItems.find((x) => x.slug === lastSlug)
    return item ? item.title : lastSlug.replace(/-/g, " ")
  }

  const itemCard = (item: ListItem) => {
    const { title, icon, slug } = item

    return (
      <ListItemCard
        key={slug}
        title={title}
        icon={icon}
        withNavigationIcon={props.withNavigationIcon || hasChildren(item)}
        onClick={() => handleClick(item)}
      />
    )
  }

  return (
    <FullScreenModal heading={getHeading()} onBackBtnClick={handleBackBtn}>
      <ul className="overflow-y-auto h-full hide-scrollbar px-6 py-2" ref={ref}>
        {props.withSearch && (
          <SearchField value={searchTerm} onChange={handleSearch} placeHolder="search" />
        )}
        {!searchTerm ? (
          <ViewportList viewportRef={ref} items={items}>
            {(item: ListItem) => itemCard(item)}
          </ViewportList>
        ) : (
          <ViewportList viewportRef={ref} items={searchedItems}>
            {(item) => itemCard(item.item)}
          </ViewportList>
        )}
      </ul>
    </FullScreenModal>
  )
}
