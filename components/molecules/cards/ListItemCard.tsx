/* eslint-disable @next/next/no-img-element */
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { beautifyWord } from "./FormFieldCard";

export interface ListItemCardProps {
    title: string;
    withNavigationIcon?: boolean;
    icon?: string;
    onClick?: () => void;
}

export default function ListItemCard(props: ListItemCardProps) {
    const { title, withNavigationIcon, icon, onClick } = props;
    const classes = [
        "flex",
        "justify-between",
        "items-center",
        "flex-none",
        "h-10",
        "cursor-pointer",
        "cursor-pointer",
        "border-b",
        "last:border-b-0",
        "border-dark-4",
        "dark:border-dark-7",
        "text-dark-8",
        "dark:text-dark-4",
    ];

    return (
        <li className={classes.join(" ") + ""} onClick={onClick}>
            <div className="flex gap-4">
                {icon && (
                    <svg className="w-6 h-6">
                        <use href={`/icons/${icon}.svg#${icon}`}></use>
                    </svg>
                )}
                {beautifyWord(title)}
            </div>
            <div>{withNavigationIcon && <ChevronRightIcon className="w-6 h-6" />}</div>
        </li>
    );
}
