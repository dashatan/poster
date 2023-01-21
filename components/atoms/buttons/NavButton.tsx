import { Icon } from "../../../utils/types"

export interface IconCardProps {
  Icon: Icon
  title: string
  onClick?: () => void
}

const NavButton = ({ Icon, title, onClick }: IconCardProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center rounded-md p-2 gap-1 w-full cursor-pointer text-dark-6 hover:text-light-7 dark:text-dark-4 hover:bg-light-5 dark:hover:bg-dark-9"
    >
      <div className="flex items-center justify-center">
        <Icon className="w-5 h-5 " />
      </div>
      <div className="flex justify-center text-sm  overflow-hidden text-ellipsis whitespace-nowrap leading-none">
        {title}
      </div>
    </button>
  )
}

export default NavButton
