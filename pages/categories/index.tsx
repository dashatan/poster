import { useRouter } from "next/router";
import { categories } from "../../app/static/categories";
import SelectiveList, {
    ListItem,
} from "../../components/templates/phone/SelectiveList";

export default function Categories() {
    const router = useRouter();

    const handleClick = (item: ListItem) => {
        router.push(`${router.asPath}/${item.title}`);
    };

    return (
        <SelectiveList
            heading="Categories"
            listItems={categories}
            onItemClick={handleClick}
        />
    );
}
