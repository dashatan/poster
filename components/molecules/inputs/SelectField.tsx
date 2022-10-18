import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SelectiveList, { ListItem } from "../../templates/phone/SelectiveList";
import FormFieldCard from "../cards/FormFieldCard";

export interface SelectFieldProps {
    label: string;
    value?: string;
    asOptionTitle?: string;
    onClick?: () => void;
    onChange?: (item: ListItem) => void;
    options?: ListItem[];
    withSearch?: boolean;
}

export default function SelectField(props: SelectFieldProps) {
    const [value, setValue] = useState(props.value);
    const router = useRouter();
    const modal = router.query.select;
    useEffect(() => {}, []);

    function modalRouter() {
        router.push(router.asPath + `?select=${props.label}`);
    }

    function handleChange(item: ListItem) {
        props.onChange && props.onChange(item);
        router.back();
    }

    return (
        <>
            <FormFieldCard
                clicked={!!value}
                label={props.label}
                onClick={modalRouter}
            >
                <>
                    <div className="text-xl text-dark-8 dark:text-dark-3">
                        {value}
                    </div>
                    <div>
                        <ChevronRightIcon className="w-6 text-dark-6 dark:text-dark-4 rtl:rotate-180" />
                    </div>
                </>
            </FormFieldCard>
            {modal && modal === props.label && (
                <div className={"fixed top-0 left-0 h-screen w-full z-10"}>
                    <SelectiveList
                        heading={props.label}
                        withSearch={props.withSearch}
                        asOptionTitle={props.asOptionTitle}
                        listItems={props.options}
                        onChange={handleChange}
                    />
                </div>
            )}
        </>
    );
}
