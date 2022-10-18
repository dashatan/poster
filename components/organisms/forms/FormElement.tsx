import { CONSTANTS } from "../../../app/static/CONSTANTS";
import SelectField from "../../molecules/inputs/SelectField";
import TextField from "../../molecules/inputs/TextField";
import { ListItem, T } from "../../templates/phone/SelectiveList";

export interface FormElementProps {
    elementType: string;
    label: string;
    value?: string;
    asOptionTitle?: string;
    asValue?: string;
    onClick?: () => void;
    onChange?: (key: string, value: string) => void;
    options?: ListItem[];
    withSearch?: boolean;
}
export default function FormElement(props: FormElementProps) {
    function SelectElement() {
        function handleChange(item: ListItem) {
            const v = props.asValue;
            const value = v ? (item as unknown as T)[v] : item.title;
            props.onChange && props.onChange(props.label, value);
        }

        return (
            <SelectField
                key={props.label + props.value}
                label={props.label}
                value={props.value}
                asOptionTitle={props.asOptionTitle}
                options={props.options}
                onChange={handleChange}
                withSearch={props.withSearch}
            />
        );
    }

    function TextElement() {
        function handleChange(value: string) {
            props.onChange && props.onChange(props.label, value);
        }
        return (
            <TextField
                key={props.label}
                label={props.label}
                value={props.value}
                onChange={handleChange}
            />
        );
    }

    switch (props.elementType) {
    case CONSTANTS.SELECT:
        return SelectElement();
    case CONSTANTS.TEXT:
        return TextElement();

    default:
        return <></>;
    }
}
