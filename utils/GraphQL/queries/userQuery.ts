export default function userQuery({ id }: { id: string | undefined | null }) {
  return `/gql?query=query{user(_id: "${id}"){name email avatar } }`
}
