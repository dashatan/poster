import Category from "./Category";

interface Post {
    title: string;
    description: string;
    categoryId: string;
    cityId: string;
    userId: string;
    images: string[];
    category: Category;
    attributes: { key: string; value: string }[];
}

export default Post;
