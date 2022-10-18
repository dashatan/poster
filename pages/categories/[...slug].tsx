import { useRouter } from "next/router";
import { categories } from "../../app/static/categories";
import SelectiveList, { ListItem } from "../../components/templates/phone/SelectiveList";

export default function CategorySubset() {
    const router = useRouter();

    const slugs = (router.query.slug as string[]) || [];
    const lastSlug = slugs[slugs.length - 1];

    const handleChange = (item: ListItem) => {
        router.push("/");
    };

    return (
        <SelectiveList
            heading={lastSlug}
            listItems={categories}
            url={slugs.join("/")}
            onChange={handleChange}
        />
    );
}
