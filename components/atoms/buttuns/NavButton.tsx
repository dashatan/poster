import { useRouter } from "next/router";
import { HeroIcon } from "../../templates/phone/Home";

export interface IconCardProps {
    Icon: HeroIcon;
    title: string;
    href?: string;
}

const NavButton = ({ Icon, title, href }: IconCardProps) => {
    const router = useRouter();
    const handleClick = () => {
        if (href) {
            router.push(href);
        }
    };
    return (
        <div
            onClick={handleClick}
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
