import { PostObject } from "../../pages/posts/create"

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
