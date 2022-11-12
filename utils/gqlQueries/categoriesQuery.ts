export default function categoriesQuery() {
  return `/gql?query=query {
            categories{
              title
              slug
              parentSlug
              icon
              attributes{
                label
                formFieldType
                filterFieldType
                props{
                  name
                  value
                }
                options
              }
            }
          }
        `
}
