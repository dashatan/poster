import { UserIcon } from "@heroicons/react/24/outline"
import { Icon } from "../../../utils/types"
import ListItemCard from "../../molecules/cards/ListItemCard"
import FullScreenModal from "../../layouts/FullScreenModal"
export interface LinkType {
  title: string
  Icon?: Icon
  onClick?: () => void
}
export interface ProfileProps {
  links: LinkType[]
}
export default function UserProfile({ links }: ProfileProps) {
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
            <UserIcon className="w-12 text-light-6" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="font-bold text-light-6 dark:text-dark-4">john doe</div>
            <div className="text-sm text-light-5 dark:text-dark-5">
              john-doe@gmail.com
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start">
          <div className="flex flex-col justify-start gap-4">{links.map(link)}</div>
        </div>
      </div>
    </FullScreenModal>
  )
}
