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
  /* prettier-ignore */
  const attrs = `[${attributes.map((attr) => `{key:"${attr.key}",value:"${attr.value}"}`)}]`
  return `/gql?query=mutation {
            addPost(
                title: "${title}", 
                categoryId: "${categoryId}",
                cityId: "${cityId}",
                userId: "${userId}",
                attributes: ${attrs} ,
                images: [${images.map((img) => `"${img}",`)}]
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
