import { useRouter } from "next/router";
import SelectiveList, {
    ListItem,
} from "../../../components/templates/phone/SelectiveList";

export interface SelectProps {
    options: ListItem[];
    onChange: () => void;
}

export default function Select(props: SelectProps) {
    const router = useRouter();

    const slugs = (router.query.slug as string[]) || [];
    const lastSlug = slugs[slugs.length - 1];

    const handleClick = (item: ListItem) => {
        if (item.subset) router.push(`${router.asPath}/${item.title}`);
        else router.push("/");
    };
    console.log(props);
    
    return (
        <SelectiveList
            heading={lastSlug}
            listItems={props.options}
            onItemClick={handleClick}
        />
    );
}
