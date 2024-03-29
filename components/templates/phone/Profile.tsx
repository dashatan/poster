import { UserIcon } from "@heroicons/react/24/outline"
import { Icon } from "utils/types"
import { User } from "utils/services/auth"
import FullScreenLoading from "components/layouts/FullScreenLoading"
import ListItemCard from "components/molecules/cards/ListItemCard"
import FullScreenModal from "components/layouts/FullScreenModal"
import Avatar from "components/molecules/cards/Avatar"

export interface LinkType {
  title: string
  Icon?: Icon
  onClick?: () => void
}
export interface ProfileProps {
  links: LinkType[]
  loading: boolean
  user: User
}

export default function UserProfile({ links, loading, user }: ProfileProps) {
  if (loading) return <FullScreenLoading />

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
    <div className="p-6 h-full overflow-y-auto hide-scrollbar flex flex-col justify-start gap-4">
      <div className="flex flex-col items-center justify-center gap-0">
        <Avatar src={user.avatar} />
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold text-light-6 dark:text-dark-4">{user.name}</div>
          <div className="text-sm text-light-5 dark:text-dark-5">{user.email}</div>
        </div>
      </div>

      <div className="flex flex-col justify-start">
        <div className="flex flex-col justify-start gap-4">{links.map(link)}</div>
      </div>
    </div>
  )
}
