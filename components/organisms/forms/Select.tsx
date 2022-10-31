import Attribute from "../../../app/types/Attribute";
import SelectField from "../../molecules/inputs/SelectField";
import { ListItem } from "../../templates/phone/SelectiveList";
import { getPropVal } from "./FormCreator";

export interface SelectProps {
    field: Attribute;
    onChange?: (key: string, value: string) => void;
    value?: string;
}

export default function Select({ field, onChange, value }: SelectProps) {
    let { label, options } = field;

    if (!options) return <></>;

    const withSearch = !!parseInt(getPropVal(field.props, "withSearch"));
    const isNested = !!parseInt(getPropVal(field.props, "isNested"));

    function nesting(options: string[]) {
        return options.map((option) => {
            const arr = option.split(" ");
            if (arr.length === 1) {
                return {
                    title: arr[0],
                    slug: arr[0].toLowerCase(),
                    parentSlug: "",
                    icon: "",
                };
            }
            return {
                title: option,
                slug: option.toLowerCase().replace(/ /g, "-"),
                parentSlug: arr[0].toLowerCase(),
                icon: "",
            };
        });
    }

    function normalization(options: string[]) {
        if (isNested) return nesting(options);
        return options.map((option) => {
            return {
                title: option.toLowerCase().replace(/-/g, " "),
                slug: option.toLowerCase().replace(/ /g, "-"),
                parentSlug: "",
                icon: "",
            };
        });
    }

    function handleChange(item: ListItem) {
        label && item.slug && onChange && onChange(label, item.slug);
    }

    return (
        <SelectField
            label={label}
            value={value}
            options={normalization(options)}
            onChange={handleChange}
            withSearch={withSearch}
        />
    );
}
