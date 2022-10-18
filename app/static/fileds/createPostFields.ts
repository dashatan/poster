import { categories } from "../categories";
import { cities } from "../cities";
import { CONSTANTS } from "../CONSTANTS";

export const createPostFields = [
    {
        elementType: CONSTANTS.SELECT,
        label: CONSTANTS.CATEGORY,
        options: categories,
        asTitle: CONSTANTS.TITLE,
        asValue: CONSTANTS.TITLE
    },
    {
        elementType: CONSTANTS.SELECT,
        label: CONSTANTS.CITY,
        options: cities,
        asTitle: CONSTANTS.SLUG,
        asValue: CONSTANTS.SLUG,
        withSearch: true,
    },
    {
        elementType: CONSTANTS.TEXT,
        label: CONSTANTS.TITLE,
    },
    {
        elementType: CONSTANTS.TEXT,
        label: CONSTANTS.DESCRIPTION,
    },
];
