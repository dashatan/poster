export default function userQuery({ id }: { id: string }) {
  return `/gql?query=query{user(_id: "${id}"){name email avatar } }`
}
