import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { HeroIcon } from "../../templates/phone/Home";

export interface ListItemCardProps {
    title: string;
    withNavigationIcon?: boolean;
    Icon?: HeroIcon;
    onClick?: () => void;
}

export default function ListItemCard(props: ListItemCardProps) {
    const { title, withNavigationIcon, Icon, onClick } = props;
    return (
        <div
            className="flex justify-between items-center flex-none h-10 cursor-pointer border-b last:border-b-0  border-dark-4 dark:border-dark-7 text-dark-8 dark:text-dark-4"
            onClick={onClick}
        >
            <div className="flex gap-4">
                {Icon && <Icon className="w-6 h-6" />}
                {title}
            </div>
            <div>
                {withNavigationIcon && <ChevronRightIcon className="w-6 h-6" />}
            </div>
        </div>
    );
}
