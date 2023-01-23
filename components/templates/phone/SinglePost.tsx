import Button from "components/atoms/buttons/Button"
import FullScreenLoading from "components/layouts/FullScreenLoading"
import { beautifyWord } from "components/molecules/cards/FormFieldCard"
import PhoneTopHeader from "components/organisms/headers/PhoneTopHeader"
import Post from "utils/types/Post"

export interface SinglePostProps {
  post: Post
}
export default function SinglePost(props: SinglePostProps) {
  const { post } = props

  return (
    <div className="w-full h-full text-light-6 bg-light-1 dark:bg-dark-6 dark:text-dark-4">
      <div
        className="h-60 w-full flex bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url('${post.images[0]}')` }}
      />
      <div className="p-2 flex flex-col gap-2">
        <p className="font-bold">{post.title}</p>
        <p className="text-sm font-thin">{post.bottomDescription}</p>
      </div>
      <div className="p-2 w-full" />
      <div className="">
        {post.attributes.map(({ key, value }, index) => {
          const bg =
            index % 2 === 0 ? "bg-blue-2 dark:bg-dark-7" : "bg-blue-1 dark:bg-dark-8"
          return (
            <div key={key} className={"flex justify-between px-4 py-2 " + bg}>
              <span>{beautifyWord(key)}</span>
              <span>{beautifyWord(value)}</span>
            </div>
          )
        })}
      </div>
      <div className="p-2 w-full" />
      <div className="p-2 flex flex-col gap-2">
        <p className="font-bold">Description</p>
        <p className="">{post.description}</p>
      </div>
      <div className=" p-2 bg-light-1 dark:bg-dark-6 w-full">
        <Button color="blue" label="Contact Info" />
      </div>
      <div className="py-10 w-full" />
    </div>
  )
}
