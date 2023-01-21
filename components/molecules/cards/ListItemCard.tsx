/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { Icon } from "../../../utils/types"
import { beautifyWord } from "./FormFieldCard"

export interface ListItemCardProps {
  title: string
  withNavigationIcon?: boolean
  icon?: string
  Icon?: Icon
  onClick?: () => void
}

export default function ListItemCard(props: ListItemCardProps) {
  const { title, withNavigationIcon, icon, Icon, onClick } = props
  const classes = [
    "flex",
    "justify-between",
    "items-center",
    "flex-none",
    "h-10",
    "cursor-pointer",
    "cursor-pointer",
    // "border-b",
    // "last:border-b-0",
    "border-dark-4",
    "dark:border-dark-7",
    "text-dark-8",
    "dark:text-dark-4",
  ].join(" ")
  const baseUrl = process.env.NEXT_PUBLIC_SERVICES_BASE_URL
  const url = `${baseUrl}/icons/${icon}.svg#${icon}`
  return (
    <li className={classes + ""} onClick={onClick}>
      <button className="flex gap-4">
        {icon && (
          // <svg className="w-6 h-6">
          //   <use href={`/icons/${icon}.svg#${icon}`}></use>
          // </svg>
          <img src={url} className="w-6 h-6 " />
        )}
        {Icon && <Icon className="w-6 h-6" />}
        {beautifyWord(title)}
      </button>
      <div>{withNavigationIcon && <ChevronRightIcon className="w-6 h-6" />}</div>
    </li>
  )
}
