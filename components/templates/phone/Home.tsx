import { useRef } from "react";
import IconCard from "../../molecules/cards/IconCard";
import PostCard, { PostCardProps } from "../../molecules/cards/PostCard";
import SearchBoxWithSelect from "../../molecules/search_boxes/SearchBoxWithSelect";
import ViewportList from "react-viewport-list";
import { Router, useRouter } from "next/router";
import { ListItem } from "./SelectiveList";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";


export interface HomeProps {
    icons: ListItem[];
    posts: PostCardProps[];
    placeHolders: {
        selectPlaceHolder: string;
        searchPlaceHolder: string;
    };
    onIconCardClick: (item: ListItem)=>void
}

export type HeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element;

const Home = (props: HomeProps) => {
    const router = useRouter();
    const { placeHolders, icons, posts, onIconCardClick } = props;
    const ref = useRef(null);
    
    return (
        <>
            <div className="p-2 h-36 flex flex-col justify-between bg-light-4 dark:bg-dark-8">
                <SearchBoxWithSelect
                    selectPlaceHolder={placeHolders.selectPlaceHolder}
                    searchPlaceHolder={placeHolders.searchPlaceHolder}
                    onSearchBarClick={() => router.push("/search")}
                    onSelectClick={() => router.push("/region")}
                />
                <div className="flex w-full gap-5 mt-4 overflow-x-auto overflow-y-hidden hide-scrollbar">
                    {icons.map((item, index) => {
                        const { title, Icon } = item;
                        return (
                            <IconCard key={index} title={title} Icon={Icon || DocumentMagnifyingGlassIcon} onClick={()=> onIconCardClick(item)} />
                        );
                    })}
                </div>
            </div>
            <div className="px-3 flex flex-col gap-3 overflow-y-auto h-[calc(100vh_-_theme(space.36)_-_theme(space.14))]" ref={ref}>
                <ViewportList viewportRef={ref} items={posts}>
                    {(item, index) => {
                        return (
                            <PostCard
                                key={index} 
                                title={item.title}
                                description1={item.description1}
                                description2={item.description2}
                                description3={item.description3}
                                imageUrl={item.imageUrl}
                            />
                        );
                    }}
                </ViewportList>
            </div>
        </>
    );
};

export default Home;
