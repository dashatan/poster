import PostCardDescription from "./PostCardDescription"
import PostCardTip from "./PostCardTip"
import PostCardTitle from "./PostCardTitle"
import {
  descriptionSkeleton,
  imageSkeleton,
  tipSkeleton,
  titleSkeleton,
} from "./Skeletons"

export default function PostCardSkeleton() {
  return (
    <div className="flex justify-between w-full p-4 rounded-lg h-40 bg-light-3 dark:bg-dark-6">
      <div className="flex justify-between flex-col w-0 h-full overflow-hidden basis-[calc(90%_-_theme(space.32))]">
        <PostCardTitle>{titleSkeleton}</PostCardTitle>
        <div>
          <PostCardDescription>
            {descriptionSkeleton}
          </PostCardDescription>
          <PostCardDescription>
            {descriptionSkeleton}
          </PostCardDescription>
          <PostCardTip>{tipSkeleton}</PostCardTip>
        </div>
      </div>
      <div className="flex content-center justify-center h-full min-w-32">
        {imageSkeleton}
      </div>
    </div>
  )
}
