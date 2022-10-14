import {
    HomeIcon,
    ListBulletIcon,
    MoonIcon,
    PlusIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import setDarkMode from "../../../app/funcs/setDarkMode";
import NavButton from "../../atoms/buttuns/NavButton";

const BottomNav = () => {
    const router = useRouter();

    const route = (href: string) => {
        if (href) {
            router.push(href);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 flex justify-around items-center w-full h-14 bg-light-4 dark:bg-dark-8">
            <NavButton
                Icon={HomeIcon}
                title="Home"
                onClick={() => route("/")}
            />
            <NavButton
                Icon={ListBulletIcon}
                title="Categories"
                onClick={() => route("/categories")}
            />
            <NavButton
                Icon={PlusIcon}
                title="Add Post"
                onClick={() => route("/add")}
            />
            <NavButton
                Icon={MoonIcon}
                title="Dark mode"
                onClick={() => {
                    const darkMode = window.localStorage.getItem("dark_mode");
                    if (darkMode !== null) setDarkMode(darkMode === "on" ? "off" : "on");
                }}
            />
            <NavButton
                Icon={UserIcon}
                title="Profile"
                onClick={() => route("/profile")}
            />
        </div>
    );
};

export default BottomNav;
