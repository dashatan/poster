import Attribute, { Prop } from "../../../app/types/Attribute";
import CheckBoxField from "../../molecules/inputs/CheckBoxField";
import NumberField from "../../molecules/inputs/NumberField";
import TextField from "../../molecules/inputs/TextField";
import Select from "./Select";

export interface FormCreatorProps {
    fields: Attribute[];
    formData: { key: string; value: string }[];
    onChange?: (key: string, value: string) => void;
    onSubmit?: () => void;
}

export function getPropVal(props: Prop[] | undefined, name: string) {
    if (props) {
        const prop = props.find((x) => x.name === name);
        if (prop) {
            return prop.value;
        }
        return "";
    }
    return "";
}

export default function FormCreator(props: FormCreatorProps) {
    const { formData } = props;

    function getFieldValue(key: string) {
        const obj = formData.find((x) => x.key === key);
        return obj ? obj.value : "";
    }
    function handleChange(key: string, value: string) {
        props.onChange && props.onChange(key, value);
    }

    return (
        <>
            {props.fields.map((field) => {
                const { label } = field;
                switch (field.formFieldType) {
                case "select":
                    return (
                        <Select
                            key={label + getFieldValue(label)}
                            field={field}
                            value={getFieldValue(label)}
                            onChange={handleChange}
                        />
                    );
                case "text":
                    return (
                        <TextField key={label} label={label} value={getFieldValue(label)} onChange={handleChange} />
                    );
                case "number":
                    return (
                        <NumberField
                            key={label}
                            label={label}
                            value={getFieldValue(label)}
                            props={field.props}
                            onChange={handleChange}
                        />
                    );
                case "checkbox":
                    return (
                        <CheckBoxField
                            key={label}
                            label={label}
                            value={getFieldValue(label)}
                            onChange={handleChange}
                        />
                    );
                }
            })}
        </>
    );
}
