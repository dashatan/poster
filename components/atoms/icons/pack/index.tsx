import React from "react";
import IconProps from "../types";
import Icons from "./IconPack";


function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  
const IconPack = ({iconName, className}: IconProps) => {
    const IconName = capitalizeFirstLetter(iconName);
    if (typeof Icons[IconName as keyof object] !== "undefined") {
        return React.createElement(Icons[IconName as keyof object], {className});
    }
    return React.createElement(Icons["search"], {className});
};

export default IconPack;
