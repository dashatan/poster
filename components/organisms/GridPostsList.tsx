/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Button from "components/atoms/buttons/Button"
import PostCard, { PostCardProps } from "components/molecules/cards/PostCard"
import { useRef } from "react"
import ViewportList from "react-viewport-list"
import Post from "utils/types/Post"
import FilterChips from "./FilterChips"

export interface GridPostsListProps {
  posts?: Post[]
  onMoreItemsClick?: () => void
  onPostClick?: (id: string) => void
  isLoading?: boolean
}
export default function GridPostsList(props: GridPostsListProps) {
  const { posts, isLoading } = props
  const ref = useRef(null)
  const noPosts = !isLoading && posts && posts.length === 0
  return (
    <div className="h-full w-full overflow-y-auto" ref={ref}>
      <FilterChips />
      {noPosts && (
        <div className="flex flex-col gap-4 w-full justify-start items-center p-8 text-xl dark:text-dark-4">
          <img
            src={`${process.env.NEXT_PUBLIC_SERVICES_BASE_URL}/icons/empty-folder.webp`}
          />
          Nothing to show here !
        </div>
      )}
      <div className="flex flex-wrap gap-y-4 w-full content-start">
        {posts &&
          posts.map((item, index) => {
            return (
              <div key={index} className="w-full md:w-full lg:w-1/2 xl:w-1/3 h-40 p-2">
                <PostCard
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  topDescription={item.topDescription}
                  middleDescription={item.middleDescription}
                  bottomDescription={item.bottomDescription}
                  thumbnail={item.thumbnail}
                  onClick={() => props.onPostClick && props.onPostClick(item._id)}
                />
              </div>
            )
          })}
      </div>
      {posts && posts.length > 0 && (
        <div className="w-full">
          <Button
            loading={props.isLoading}
            color="blue"
            label="More items"
            onClick={props.isLoading ? () => {} : props.onMoreItemsClick}
            className="my-4 mx-2 mb-20 w-36"
          />
        </div>
      )}
    </div>
  )
}
