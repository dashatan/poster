import React from "react";
import IconProps from "../types";
import * as Icons from "./IconPack";


function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  
const IconPack = (props: IconProps) => {
    const IconName = capitalizeFirstLetter(props.iconName);
    if (typeof Icons[IconName as keyof object] !== "undefined") {
        return React.createElement(Icons[IconName as keyof object], props);
    }
    return React.createElement(Icons["SearchIcon"], props);
};

export default IconPack;
