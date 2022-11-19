import Attribute from "./Attribute"

interface Category {
  title: string
  slug: string
  parentSlug: string
  icon?: string
  attributes?: Attribute[]
}

export default Category
