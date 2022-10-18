import { ListItem } from "../../components/templates/phone/SelectiveList";
import { CONSTANTS } from "./CONSTANTS";

export interface Filters {
    [x: string]: string ;
}

export const filters: Filters = {
    [CONSTANTS.CATEGORY]: "",
    [CONSTANTS.CITY]: "",
    [CONSTANTS.TITLE]: "",
    [CONSTANTS.DESCRIPTION]: "",
};
