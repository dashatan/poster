import Image from "next/image"
import PostCardBody from "./PostCardBody"
import PostCardContainer from "./PostCardContainer"
import PostCardDescription from "./PostCardDescription"
import PostCardImage from "./PostCardImage"
import PostCardImagePlaceHolder from "./PostCardImagePlaceHolder"
import PostCardTip from "./PostCardTip"
import PostCardTitle from "./PostCardTitle"

export interface PostCardProps {
    title: string;
    topDescription?: string;
    middleDescription?: string;
    bottomDescription?: string;
    thumbnail?: string;
}

export default function PostCard(props: PostCardProps) {
  const { title, topDescription, middleDescription, bottomDescription, thumbnail } = props

  const image = thumbnail ? (
    <Image alt={title} src={thumbnail} width="128" height="128" className="rounded-xl" />
  ) : (
    <PostCardImagePlaceHolder />
  )
  return (
    <PostCardContainer>
      <PostCardBody>
        <PostCardTitle>{title}</PostCardTitle>
        <div>
          <PostCardDescription>{topDescription}</PostCardDescription>
          <PostCardDescription>{middleDescription}</PostCardDescription>
          <PostCardTip>{bottomDescription}</PostCardTip>
        </div>
      </PostCardBody>
      <PostCardImage>{image}</PostCardImage>
    </PostCardContainer>
  )
}
