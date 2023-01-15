import PostCard, { PostCardProps } from "components/molecules/cards/PostCard"
import { useRef } from "react"
import ViewportList from "react-viewport-list"

export interface GridPostsListProps {
  posts?: PostCardProps[]
}
export default function GridPostsList(props: GridPostsListProps) {
  const ref = useRef(null)
  return (
    <div className="h-full overflow-y-auto flex flex-wrap w-full" ref={ref}>
      {props.posts?.map((item, index) => {
        return (
          <div key={index} className="w-full md:w-full lg:w-1/2 xl:w-1/3 p-2">
            <PostCard
              key={index}
              title={item.title}
              topDescription={item.topDescription}
              middleDescription={item.middleDescription}
              bottomDescription={item.bottomDescription}
              thumbnail={item.thumbnail}
            />
          </div>
        )
      })}
    </div>
  )
}
