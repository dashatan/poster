import { useRouter } from "next/router";
import { ChangeEvent, useRef, useState } from "react";
import ViewportList from "react-viewport-list";
import ListItemCard from "../../molecules/cards/ListItemCard";
import SearchField from "../../molecules/inputs/SearchField";
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
    listItems?: ListItem[];
    onChange?: (item: ListItem) => void;
    onBackBtnClick?: () => void;
    withNavigationIcon?: boolean;
    asOptionTitle?: string;
    withSearch?: boolean;
    withRouter?: boolean;
    url?: string;
}
export interface T {
    [key: string]: string;
}

export default function SelectiveList(props: SelectiveListProps) {
    const { onChange, withNavigationIcon, asOptionTitle } = props;
    const router = useRouter();
    const ref = useRef(null);
    const [url, setUrl] = useState(props.url || "");
    const [items, setItems] = useState(props.url ? getItemsByUrl(props.url) : props.listItems);
    const [searchTerm, setSearchTerm] = useState("");

    function getTitle(item: ListItem) {
        const t = asOptionTitle;
        return t ? (item as unknown as T)[t] : item.title;
    }

    function handleClick(item: ListItem) {
        if (item.subset) {
            const title = getTitle(item);
            const newUrl = `${url}/${title}`;
            setUrl(newUrl);
            setItems(getItemsByUrl(newUrl));
            props.withRouter && router.push(router.asPath + "/" + title);
        } else {
            onChange && onChange(item);
        }
    }

    function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setSearchTerm(value);
        const currentItems = getItemsByUrl(url);
        let f = !value
            ? currentItems
            : currentItems &&
              currentItems.filter((x) => {
                  const title = getTitle(x);
                  return title.toLowerCase().includes(value.toLowerCase());
              });
        setItems(f);
    }

    function handleBackBtn() {
        let u = url.split("/");
        u = u.filter((x) => x !== u[u.length - 1]);
        const newUrl = u.join("/");
        setUrl(newUrl);
        setItems(getItemsByUrl(newUrl));
        props.withRouter && router.back();
    }

    function getItemsByUrl(url: string) {
        let slugs = url.split("/");
        let newItems = props.listItems || [];
        slugs.forEach((slug) => {
            const item = newItems.find((x) => {
                const title = getTitle(x);
                return title.toLowerCase() === slug.toLowerCase();
            });
            newItems = item && item.subset ? item.subset : newItems;
        });

        return newItems;
    }

    function getHeading() {
        let u = url.split("/");
        return u[u.length - 1] || props.heading;
    }

    return (
        <div className="h-screen bg-light-2 dark:bg-dark-6">
            <PhoneTopHeader text={getHeading()} withBackBtn onBackBtnClick={url ? handleBackBtn : undefined} />
            <div className="px-2 overflow-y-auto h-[calc(100%_-_theme(space.10))]" ref={ref}>
                {props.withSearch && <SearchField value={searchTerm} onChange={handleSearch} placeHolder="search" />}
                <ViewportList viewportRef={ref} items={items}>
                    {(item) => {
                        const { id, title, Icon, subset } = item;
                        const t = asOptionTitle;
                        return (
                            <ListItemCard
                                key={id || title}
                                title={t ? (item as unknown as T)[t] : title}
                                Icon={Icon}
                                withNavigationIcon={withNavigationIcon || !!subset}
                                onClick={() => handleClick(item)}
                            />
                        );
                    }}
                </ViewportList>
            </div>
        </div>
    );
}
