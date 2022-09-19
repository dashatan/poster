import IconPack from "../../atoms/icons/pack";

export interface CategoryCardProps {
    iconName: string;
    title: string;
}

const CategoryCard = ({ iconName, title }: CategoryCardProps) => {
    
    return (
        <div className="flex flex-col items-center justify-between gap-2">
            <div className="bg-slate-400 flex justify-center items-center rounded-full p-2 w-10 h-10">
                <IconPack iconName={iconName} className="text-slate-800" />
            </div>
            <div className="flex justify-center text-slate-400">
                <span>{title}</span>
            </div>
        </div>
    );
};

export default CategoryCard;
