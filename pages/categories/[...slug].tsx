import { useRouter } from "next/router";
import { categories } from "../../app/static/categories";
import SelectiveList, {
    ListItem,
} from "../../components/templates/phone/SelectiveList";

export default function CategorySubset() {
    const router = useRouter();

    const slugs = (router.query.slug as string[]) || [];
    const lastSlug = slugs[slugs.length - 1];

    let currentCategories: ListItem[] = categories;
    slugs.forEach((slug) => {
        const currentCategory = currentCategories.find((x) => x.title === slug);
        currentCategories =
            currentCategory && currentCategory.subset
                ? currentCategory.subset
                : currentCategories;
    });
    const handleClick = (item: ListItem) => {
        if (item.subset) router.push(`${router.asPath}/${item.title}`);
        else router.push("/");
    };

    return (
        <SelectiveList
            heading={lastSlug}
            listItems={currentCategories}
            onItemClick={handleClick}
        />
    );
}
