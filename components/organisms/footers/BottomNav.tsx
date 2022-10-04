import {
    ChatBubbleBottomCenterTextIcon,
    HomeIcon,
    ListBulletIcon,
    PlusIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import NavButton from "../../atoms/buttuns/NavButton";

const BottomNav = () => {
    return (
        <div className="fixed bottom-0 left-0 flex justify-around items-center w-full h-14 bg-light-3 dark:bg-dark-6">
            <NavButton Icon={HomeIcon} title="Home" href="/" />
            <NavButton Icon={ListBulletIcon} title="Categories" href="categories" />
            <NavButton Icon={PlusIcon} title="Add Post" />
            <NavButton Icon={ChatBubbleBottomCenterTextIcon} title="Chat" />
            <NavButton Icon={UserIcon} title="Profile" href="profile"/>
        </div>
    );
};

export default BottomNav;
