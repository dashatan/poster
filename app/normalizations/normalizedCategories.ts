import Attribute from "../types/Attribute";
import Category, { NormalizedCategory } from "../types/Category";

export default function normalizedCategories(cats: Category[]): NormalizedCategory[] {
    function normalizedCategory(category: Category) {
        return {
            title: category.title.replace(/-/g, " "),
            slug: category.title,
            parentSlug: category.parentSlug,
            icon: category.icon,
        };
    }

    function normalizedAttribute(attribute: Attribute) {
        return {
            ...attribute,
            options: [],
        };
    }

    return cats.map((cat) => {
        if (cat.attributes) {
            const normalizedAttributes = cat.attributes.map((attr) => {
                const normalizedAttribute = {
                    ...attr,
                    options: [],
                };
                if (attr.options) {
                    const normalizedOptions = attr.options.map((option) => {
                        return {
                            title: option,
                            slug: option.replace(/ /g, "-"),
                            parentSlug: "",
                            icon: "",
                        };
                    });
                    return { ...attr, options: normalizedOptions };
                }
                return normalizedAttribute(attr);
            });
            return {
                ...normalizedCategory(cat),
                attributes: normalizedAttributes,
            };
        }
        return normalizedCategory(cat);
    });
}
