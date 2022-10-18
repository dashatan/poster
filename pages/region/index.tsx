import provinces from "../../app/static/iran/provinces.json";
import { useRouter } from "next/router";
import SelectiveList, {
    ListItem,
} from "../../components/templates/phone/SelectiveList";

export default function Region() {
    const router = useRouter();

    function handleClick(item: ListItem) {
        router.push(`${router.asPath}/${item.slug}`);
    }

    return (
        <SelectiveList
            heading="Provinces"
            listItems={provinces}
            asOptionTitle="title_en"
            onChange={handleClick}
            withNavigationIcon={true}
        />
    );
}
