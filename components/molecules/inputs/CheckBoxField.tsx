import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import FormFieldCard from "../cards/FormFieldCard";

export interface CheckBoxFieldProps {
    label: string;
    value?: string;
    type?: string;
    onChange?: (key: string, value: string) => void;
}

export default function CheckBoxField(props: CheckBoxFieldProps) {
    const [value, setValue] = useState(props.value || "0");
    useEffect(() => {
        props.onChange && props.onChange(props.label, value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    function handleClick() {
        setValue((value) => (value === "0" ? "1" : "0"));
    }

    const CircleIcon = (
        <svg className="w-6 p-0.5" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
            <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)" strokeWidth="2">
                    <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                </g>
            </g>
        </svg>
    );

    return (
        <FormFieldCard label={props.label} onClick={handleClick}>
            <div className="text-base text-dark-8 dark:text-dark-3"></div>
            {value === "1" ? <CheckCircleIcon className="w-6 text-dark-6 dark:text-dark-4" /> : CircleIcon}
        </FormFieldCard>
    );
}
