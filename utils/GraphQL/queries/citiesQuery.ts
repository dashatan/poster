export default function citiesQuery() {
  return `/gql?query=query {
            cities{
              icon
              title
              slug
              parentSlug
            }
          }`
}
