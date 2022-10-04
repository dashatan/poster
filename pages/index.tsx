import type { NextPage } from "next";
import { categories } from "../app/static/categories";
import { posts } from "../app/static/posts";
import Home from "../components/templates/phone/Home";

const HomePage: NextPage = () => {
    
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

export default HomePage;
