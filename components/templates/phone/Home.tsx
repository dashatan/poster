import { useRef } from "react";
import IconCard from "../../molecules/cards/IconCard";
import PostCard, { PostCardProps } from "../../molecules/cards/PostCard";
import SearchBoxWithSelect from "../../molecules/search_boxes/SearchBoxWithSelect";
import ViewportList from "react-viewport-list";

export interface HomeProps {
    icons: { title: string; Icon: HeroIcon }[];
    posts: PostCardProps[];
    placeHolders: {
        selectPlaceHolder: string;
        searchPlaceHolder: string;
    };
}

export type HeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element;

const Home = (props: HomeProps) => {
    const { placeHolders, icons, posts } = props;
    const ref = useRef(null);
    
    return (
        <>
            <div className="p-2 h-36 flex flex-col justify-between bg-light-4 dark:bg-dark-8">
                <SearchBoxWithSelect
                    selectPlaceHolder={placeHolders.selectPlaceHolder}
                    searchPlaceHolder={placeHolders.searchPlaceHolder}
                />
                <div className="flex w-full gap-5 mt-4 overflow-x-auto overflow-y-hidden hide-scrollbar">
                    {icons.map((item, index) => {
                        const { title, Icon } = item;
                        return (
                            <IconCard key={index} title={title} Icon={Icon} />
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
