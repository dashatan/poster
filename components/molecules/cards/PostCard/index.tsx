import Image from "next/image";
import PostCardBody from "./PostCardBody";
import PostCardContainer from "./PostCardContainer";
import PostCardDescription from "./PostCardDescription";
import PostCardImage from "./PostCardImage";
import PostCardImagePlaceHolder from "./PostCardImagePlaceHolder";
import PostCardTip from "./PostCardTip";
import PostCardTitle from "./PostCardTitle";

export interface PostCardProps {
    title: string;
    description1?: string;
    description2?: string;
    description3?: string;
    imageUrl?: string;
}

export default function PostCard(props: PostCardProps) {
    const { title, description1, description2, description3, imageUrl } = props;

    const image = imageUrl ? (
        <Image
            alt={title}
            src={imageUrl}
            width="128"
            height="128"
            className="rounded-xl"
        />
    ) : (
        <PostCardImagePlaceHolder />
    );
    return (
        <PostCardContainer>
            <PostCardBody>
                <PostCardTitle>{title}</PostCardTitle>
                <div>
                    <PostCardDescription>{description1}</PostCardDescription>
                    <PostCardDescription>{description2}</PostCardDescription>
                    <PostCardTip>{description3}</PostCardTip>
                </div>
            </PostCardBody>
            <PostCardImage>{image}</PostCardImage>
        </PostCardContainer>
    );
}
