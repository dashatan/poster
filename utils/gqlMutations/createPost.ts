import { KeyValueObj } from "../types"

export interface PostObject {
  title: string
  categoryId: string
  cityId: string
  userId: string
  attributes: KeyValueObj[]
  images: string[]
}
export default function createPost(body: PostObject) {
  const { title, attributes, categoryId, cityId, images, userId } = body
  return `/gql?mutation {
    addPost(
        title: ${title}, 
        categoryId: ${categoryId},
        cityId: ${cityId},
        userId: ${userId},
        attributes: ${attributes},
        images: ${images}
        ) {
      title
      _id
      categoryId
      cityId
      userId
      images
      thumbnail
    }
  }`
}
