import { UserIcon } from "@heroicons/react/24/outline"
import { Icon } from "../../../utils/types"
import ListItemCard from "../../molecules/cards/ListItemCard"
import FullScreenModal from "../../layouts/FullScreenModal"
import FullScreenLoading from "../../layouts/FullScreenLoading"
import { User } from "../../../utils/services/auth"
export interface LinkType {
  title: string
  Icon?: Icon
  onClick?: () => void
}
export interface ProfileProps {
  links: LinkType[]
  loading: boolean
  user?: User
}
export default function UserProfile({ links, loading, user }: ProfileProps) {
  if (loading || !user) return <FullScreenLoading />

  const link = (link: LinkType, index: number) =>
    link.title === "divider" ? (
      <div key={index} className="border-t w-full border-light-4 dark:border-dark-5" />
    ) : (
      <ListItemCard
        key={index}
        title={link.title}
        Icon={link.Icon}
        withNavigationIcon={true}
        onClick={link.onClick}
      />
    )

  return (
    <FullScreenModal heading="Profile">
      <div className="p-6 h-full overflow-y-auto hide-scrollbar flex flex-col justify-start gap-4">
        <div className="flex flex-col items-center justify-center gap-0">
          <div className="bg-light-4 rounded-full w-24 h-24 flex justify-center items-center">
            {user.avatar ? <div></div> : <UserIcon className="w-12 text-light-6" />}
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="font-bold text-light-6 dark:text-dark-4">{user.name}</div>
            <div className="text-sm text-light-5 dark:text-dark-5">{user.email}</div>
          </div>
        </div>

        <div className="flex flex-col justify-start">
          <div className="flex flex-col justify-start gap-4">{links.map(link)}</div>
        </div>
      </div>
    </FullScreenModal>
  )
}
