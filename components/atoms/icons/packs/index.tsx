import React from "react";
import * as Icons from ".";

export interface IconProps {
    name: string;
    className?: string
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  
const IconsPack = (props: IconProps) => {
    const IconName = capitalizeFirstLetter(props.name);
    if (typeof Icons[IconName as keyof object] !== "undefined") {
        return React.createElement(Icons[IconName as keyof object], props);
    }
    return React.createElement(Icons["SearchIcon"], props);
};

export default IconsPack;
