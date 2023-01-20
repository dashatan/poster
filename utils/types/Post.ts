import Category from "./Category"

interface Post {
  _id: string
  title: string
  description: string
  categoryId: string
  cityId: string
  userId: string
  images: string[]
  thumbnail: string
  category: Category
  topDescription: string
  middleDescription: string
  bottomDescription: string
  attributes: { key: string; value: string }[]
  createdAt: string
  updatedAt: string
}

export default Post
