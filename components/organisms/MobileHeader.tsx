import CategoryCard from "../molecules/cards/CategoryCard";
import SearchBox from "./SearchBox";

export interface SearchBoxProps {
    placeholder: string;
}

const categories = [
    {
        title: "mobile",
        icon: "MobileIcon"
    },
    {
        title: "search",
        icon: "SearchIcon"
    },
    {
        title: "map",
        icon: "MapIcon",
    },
    {
        title: "cars",
        icon: "CarIcon",
    },
];

const MobileHeader = (props: any) => {
    return (
        <div className="bg-slate-800 p-2 flex flex-col gap-8">
            <SearchBox />
            <div className="flex flex-row-reverse gap-2">
                {categories.map((item, index) => {
                    return (
                        <CategoryCard
                            key={index}
                            title={item.title}
                            iconName={item.icon}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default MobileHeader;
