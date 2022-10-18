import { useRouter } from "next/router";
import {
    HomeIcon,
    ListBulletIcon,
    MoonIcon,
    PlusIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import useDarkMode from "./useDarkMode";

export default function useNavItems() {
    const router = useRouter();
    const setDarkMode = useDarkMode;

    const route = (url: string) => {
        router.push(url);
    };

    function handleDarkMode() {
        const darkMode = window.localStorage.getItem("dark_mode");
        if (darkMode !== null) setDarkMode(darkMode === "on" ? "off" : "on");
    }

    const navItems = [
        {
            Icon: HomeIcon,
            title: "Home",
            onClick: () => route("/"),
        },
        {
            Icon: ListBulletIcon,
            title: "Categories",
            onClick: () => route("/categories"),
        },
        {
            Icon: PlusIcon,
            title: "NewPost",
            onClick: () => route("/posts/create"),
        },
        {
            Icon: MoonIcon,
            title: "Dark mode",
            onClick: handleDarkMode,
        },
        {
            Icon: UserIcon,
            title: "Profile",
            onClick: () => route("/profile"),
        },
    ];
    return navItems;
}
