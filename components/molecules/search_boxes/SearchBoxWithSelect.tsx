import MapIcon from "../../atoms/icons/MapIcon";
import SearchIcon from "../../atoms/icons/SearchIcon";

interface props {
    searchPlaceHolder: string;
    selectPlaceHolder: string;
    onSearchBarClick: () => void;
    onSelectClick: () => void;
}

const SearchBoxWithSelect = (props: props) => {
    const {
        searchPlaceHolder,
        selectPlaceHolder,
        onSearchBarClick,
        onSelectClick,
    } = props;
    return (
        <div className="flex gap-2 p-2 divide-x-2 rounded-md rtl:flex-row-reverse bg-light-2 dark:bg-dark-6 divide-dark-6 dark:divide-dark-4">
            <div
                className="flex gap-2 rtl:flex-row-reverse basis-1/4"
                onClick={onSelectClick}
            >
                <MapIcon className="h-6 2-6 text-dark-6 dark:text-dark-4" />
                <span className="text-dark-6 dark:text-dark-4">
                    {selectPlaceHolder}
                </span>
            </div>
            <div
                className="flex justify-end gap-2 rtl:flex-row-reverse basis-3/4"
                onClick={onSearchBarClick}
            >
                <span className="text-dark-2 dark:text-dark-1">{searchPlaceHolder}</span>
                <SearchIcon className="w-6 h-6 text-dark-6 dark:text-dark-4" />
            </div>
        </div>
    );
};

export default SearchBoxWithSelect;
