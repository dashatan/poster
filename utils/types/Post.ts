import Category from "./Category"

interface Post {
  _id: string
  userId: string
  cityId: string
  categoryId: string
  category: Category
  title: string
  description: string
  images: string[]
  attributes: { key: string; value: string }[]
}

export default Post
