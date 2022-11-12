export default function postsQuery() {
  return `/gql?query=query {
                posts{
                    thumbnail
                    title
                    topDescription
                    middleDescription
                    bottomDescription
                }
            }`
}
