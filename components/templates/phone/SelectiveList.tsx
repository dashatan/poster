import { useRef } from "react";
import ViewportList from "react-viewport-list";
import ListItemCard from "../../molecules/cards/ListItemCard";
import PhoneTopHeader from "../../organisms/headers/PhoneTopHeader";
import { HeroIcon } from "./Home";

export interface ListItem {
    id?: number | string;
    title: string;
    slug?: string;
    title_en?: string;
    Icon?: HeroIcon;
    subset?: ListItem[];
}
export interface SelectiveListProps {
    heading: string;
    listItems: ListItem[];
    onItemClick?: (item: ListItem) => void;
    withNavigationIcon?: boolean;
    titleVariableName?: string;
}
interface T {
    [key: string]: string;
}

export default function SelectiveList(props: SelectiveListProps) {
    const {
        heading,
        listItems,
        onItemClick,
        withNavigationIcon,
        titleVariableName,
    } = props;
    const ref = useRef(null);

    return (
        <div className="h-screen bg-light-2 dark:bg-dark-6">
            <PhoneTopHeader text={heading} withBackBtn />
            <div
                className="px-2 overflow-y-auto h-[calc(100%_-_theme(space.10))]"
                ref={ref}
            >
                <ViewportList viewportRef={ref} items={listItems}>
                    {(item) => {
                        const { id, title, Icon, subset } = item;
                        const t = titleVariableName;
                        return (
                            <ListItemCard
                                key={id || title}
                                title={t ? (item as unknown as T)[t] : title}
                                Icon={Icon}
                                withNavigationIcon={
                                    withNavigationIcon || !!subset
                                }
                                onClick={() =>
                                    !!onItemClick && onItemClick(item)
                                }
                            />
                        );
                    }}
                </ViewportList>
            </div>
        </div>
    );
}
