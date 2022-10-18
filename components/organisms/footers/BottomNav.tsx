import NavButton from "../../atoms/buttons/NavButton";
import { HeroIcon } from "../../templates/phone/Home";

export interface NavButtonProps {
    Icon: HeroIcon;
    title: string;
    onClick: () => void;
}

export interface BottomNavProps {
    navItems: NavButtonProps[];
}

export default function BottomNav({ navItems }: BottomNavProps) {
    return (
        <div className="fixed bottom-0 left-0 flex justify-around items-center w-full h-14 bg-light-4 dark:bg-dark-8">
            {navItems.map((item: NavButtonProps) => {
                const { Icon, title, onClick } = item;
                return (
                    <NavButton
                        key={title}
                        Icon={Icon}
                        title={title}
                        onClick={onClick}
                    />
                );
            })}
        </div>
    );
}
