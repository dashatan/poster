import dynamic from "next/dynamic";
import { ComponentType } from "react";
import IconProps from "../types";
import SearchIcon from "../SearchIcon";

const DynamicIcon = ({iconName, className}:IconProps) => {
    const Component: ComponentType<IconProps> = dynamic(() =>
        import(`../../atoms/icons/${iconName}`)
            .then((el) => {
                return el;
            })
            .catch((_err) => {
                return SearchIcon;
            })
    );

    return <Component iconName={iconName} className={className} />;
};



export default DynamicIcon;