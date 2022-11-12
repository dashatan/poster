import { useRef } from "react"
import IconCard from "../../molecules/cards/IconCard"
import PostCard, { PostCardProps } from "../../molecules/cards/PostCard"
import SearchBoxWithSelect from "../../molecules/search_boxes/SearchBoxWithSelect"
import ViewportList from "react-viewport-list"
import { useRouter } from "next/router"
import { ListItem } from "./SelectiveList"
import Category from "../../../utils/types/Category"

export interface HomeProps {
  categories?: Category[]
  posts: PostCardProps[]
  placeHolders: {
    selectPlaceHolder: string
    searchPlaceHolder: string
  }
  onIconCardClick: (item: ListItem) => void
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
      "flex-col",
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
        <ViewportList viewportRef={ref} items={posts}>
          {(item, index) => {
            return (
              <PostCard
                key={index}
                title={item.title}
                topDescription={item.topDescription}
                middleDescription={item.middleDescription}
                bottomDescription={item.bottomDescription}
                thumbnail={item.thumbnail}
              />
            )
          }}
        </ViewportList>
      </div>
    </>
  )
}

export default Home
