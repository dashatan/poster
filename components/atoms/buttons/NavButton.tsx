import { HeroIcon } from "../../templates/phone/Home";

export interface IconCardProps {
    Icon: HeroIcon;
    title: string;
    onClick?: () => void;
}

const NavButton = ({ Icon, title, onClick }: IconCardProps) => {
    
    return (
        <div
            onClick={onClick}
            className="flex flex-col items-center  gap-1 w-11"
        >
            <div className="flex items-center justify-center">
                <Icon className="w-5 h-5 text-dark-6 dark:text-dark-4" />
            </div>
            <div className="flex justify-center text-sm text-dark-6 dark:text-light-2 overflow-hidden text-ellipsis whitespace-nowrap leading-none">
                {title}
            </div>
        </div>
    );
};

export default NavButton;
