/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useRef } from "react"
import IconCard from "../../molecules/cards/IconCard"
import PostCard, { PostCardProps } from "../../molecules/cards/PostCard"
import SearchBoxWithSelect from "../../molecules/search_boxes/SearchBoxWithSelect"
import ViewportList from "react-viewport-list"
import { useRouter } from "next/router"
import { ListItem } from "../../organisms/SelectiveList"
import Category from "../../../utils/types/Category"
import Button from "components/atoms/buttons/Button"
import { XCircleIcon } from "@heroicons/react/24/outline"
import FilterChips from "components/organisms/FilterChips"
import GridPostsList from "components/organisms/GridPostsList"

export interface HomeProps {
  categories?: Category[]
  posts: PostCardProps[]
  loadingPosts?: boolean
  placeHolders: {
    selectPlaceHolder: string
    searchPlaceHolder: string
  }
  onIconCardClick: (item: ListItem) => void
  onMoreItemsClick?: () => void
}

const Home = (props: HomeProps) => {
  const router = useRouter()
  const { placeHolders, categories, posts, onIconCardClick } = props
  const ref = useRef(null)

  const classes = {
    container: [
      "p-2",
      "h-36",
      "flex",
      "flex-col",
      "justify-between",
      "bg-light-4",
      "dark:bg-dark-8",
    ],
    header: [
      "flex",
      "w-full",
      "gap-5",
      "mt-4",
      "overflow-x-auto",
      "overflow-y-hidden",
      "hide-scrollbar",
    ],
    body: [
      "px-3",
      "flex",
      "flex-wrap",
      "gap-3",
      "overflow-y-auto",
      "h-[calc(100vh_-_theme(space.36)_-_theme(space.14))]",
    ],
  }

  return (
    <>
      <div className={classes.container.join(" ")}>
        <SearchBoxWithSelect
          selectPlaceHolder={placeHolders.selectPlaceHolder}
          searchPlaceHolder={placeHolders.searchPlaceHolder}
          onSearchBarClick={() => router.push("/search")}
          onSelectClick={() => router.push("/region")}
        />
        <div className={classes.header.join(" ")}>
          {categories?.map((cat, index) => {
            const { title, icon } = cat
            return (
              <IconCard
                key={index}
                title={title}
                icon={icon}
                onClick={() => onIconCardClick(cat)}
              />
            )
          })}
        </div>
      </div>
      <div className={classes.body.join(" ")} ref={ref}>
        <GridPostsList
          posts={posts}
          isLoading={props.loadingPosts}
          onMoreItemsClick={props.onMoreItemsClick}
        />
      </div>
    </>
  )
}

export default Home
