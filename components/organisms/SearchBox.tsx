import MapIcon from "../atoms/icons/MapIcon";
import SearchIcon from "../atoms/icons/SearchIcon";

const SearchBox = () => {
    return (
        <div className="bg-slate-700 p-2 rounded-md flex divide-x-2 divide-slate-400">
            <div className="flex basis-1/4 gap-2">
                <MapIcon className="h-6 2-6 text-slate-400" />
                <span className="text-slate-400">Tehran</span>
            </div>
            <div className="flex basis-3/4 justify-end gap-2">
                <span className="text-slate-400">Search for new ads</span>
                <SearchIcon className="h-6 w-6 text-slate-400" />
            </div>
        </div>
    );
};

export default SearchBox;
