import { useState } from "react";
import FormFieldCard from "../cards/FormFieldCard";

export interface TextFieldProps {
    label: string;
    value?: string;
    onChange?: (value: string) => void;
}

export default function TextField(props: TextFieldProps) {
    const [value, setValue] = useState(props.value || "");
    const [inputFocused, setInputFocused] = useState(false);

    return (
        <FormFieldCard clicked={!(!inputFocused && !value)} label={props.label}>
            <div className="text-xl text-dark-8 dark:text-dark-3 w-full">
                <input
                    type="text"
                    className="bg-light-2 dark:bg-dark-6 h-12 w-full focus-visible:outline-none"
                    defaultValue={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        !!props.onChange && props.onChange(e.target.value);
                    }}
                    onFocus={() => {
                        setInputFocused(true);
                    }}
                    onBlur={() => {
                        setInputFocused(false);
                    }}
                />
            </div>
        </FormFieldCard>
    );
}
