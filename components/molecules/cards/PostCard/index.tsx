/* eslint-disable @next/next/no-img-element */
import Image from "next/image"
import PostCardBody from "./PostCardBody"
import PostCardContainer from "./PostCardContainer"
import PostCardDescription from "./PostCardDescription"
import PostCardImage from "./PostCardImage"
import PostCardImagePlaceHolder from "./PostCardImagePlaceHolder"
import PostCardTip from "./PostCardTip"
import PostCardTitle from "./PostCardTitle"

export interface PostCardProps {
  id: string | number
  title: string
  topDescription?: string
  middleDescription?: string
  bottomDescription?: string
  thumbnail?: string
  onClick: () => void
}

export default function PostCard(props: PostCardProps) {
  const { title, topDescription, middleDescription, bottomDescription, thumbnail } = props

  const image = thumbnail ? (
    <img alt={title} src={thumbnail} width="128" height="128" className="rounded-xl" />
  ) : (
    <PostCardImagePlaceHolder />
  )
  return (
    <PostCardContainer onClick={props.onClick}>
      <PostCardBody>
        <PostCardTitle>{title}</PostCardTitle>
        <div>
          <PostCardDescription>{topDescription}</PostCardDescription>
          <PostCardDescription>{middleDescription}</PostCardDescription>
          <PostCardTip>{bottomDescription}</PostCardTip>
        </div>
      </PostCardBody>
      <PostCardImage src={thumbnail} />
    </PostCardContainer>
  )
}
