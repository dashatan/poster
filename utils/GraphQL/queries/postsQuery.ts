/* eslint-disable indent */
import { KeyValueObj } from "utils/types"

export interface postQueryArgs {
  limit?: number
  page?: number
  sort?: string
  filters?: KeyValueObj[]
}
export default function postsQuery(args: postQueryArgs) {
  const filters = args.filters
    ? `filters: [${args.filters.map(
        (filter) => `{key: "${filter.key}", value: "${filter.value}"}`
      )}],`
    : ""
  return `/gql?query=query {
                posts(
                    ${args.limit ? `limit: ${args.limit} ,` : ""}
                    ${args.page ? `page: ${args.page} ,` : ""}
                    ${args.sort ? `sort: "${args.sort}",` : ""}
                    ${filters}
                    ){
                    thumbnail
                    title
                    topDescription
                    middleDescription
                    bottomDescription
                }
            }`
}
