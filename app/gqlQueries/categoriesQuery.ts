export default function categoriesQuery() {
    return `?query=query {
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
        `;
}
