/* eslint-disable indent */
import { KeyValueObj } from "utils/types"

export interface postQueryArgs {
  id: string | number
}
export default function postQuery(args: postQueryArgs) {
  return `/gql?query=query {
                post(_id:"${args.id}"){
                    images
                    title
                    description
                    attributes{
                      key
                      value
                    }
                    category{
                      title
                    }
                    bottomDescription
                    bottomDescription
                }
            }`
}
