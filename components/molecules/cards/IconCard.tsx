import { HeroIcon } from "../../templates/phone/Home";

export interface IconCardProps {
    Icon: HeroIcon;
    title: string;
}

const IconCard = ({ Icon, title }: IconCardProps) => {
    return (
        <div className="flex flex-col items-center justify-between w-12 gap-2">
            <div className="flex items-center justify-center w-10 h-10 p-2 rounded-full bg-light-2 dark:bg-dark-6">
                <Icon className="text-dark-6 dark:text-dark-4"/>
            </div>
            <div className="flex justify-center w-10 text-sm text-dark-6 dark:text-dark-4">
                <span>{title}</span>
            </div>
        </div>
    );
};

export default IconCard;