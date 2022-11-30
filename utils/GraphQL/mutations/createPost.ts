import { KeyValueObj } from "../../types"

export interface PostObject {
  userId: string
  cityId: string
  categoryId: string
  title: string
  description: string
  attributes: KeyValueObj[]
  images: string[]
}

export default function createPost(body: PostObject) {
  const { userId, cityId, categoryId, title, description, attributes, images } = body
  const attrs = attributes.map((attr) => `{key:"${attr.key}",value:"${attr.value}"}`)
  const imgs = images.map((img) => `"${img}",`)
  return `/gql?query=mutation{
            newPost(
              userId: "${userId}",
              cityId: "${cityId}",
              categoryId: "${categoryId}",
              title: "${title}", 
              description: "${description}", 
              attributes: [${attrs}] ,
              images: [${imgs}]
              ) {
                _id
                title
                userId
                attributes{
                  key
                  value
                }
            }
          }`
}
