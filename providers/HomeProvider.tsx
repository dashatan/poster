import Home from "../components/templates/phone/Home";
import { useEffect, useState } from "react";
import { categories } from "../app/static/categories";

const HomeProvider = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const posts = [{ title: "post1" }];
    return (
        <Home
            icons={categories}
            posts={posts}
            placeHolders={{
                selectPlaceHolder: "Tehran",
                searchPlaceHolder: "Search For New Ads",
            }}
        />
    );
};

export default HomeProvider;
