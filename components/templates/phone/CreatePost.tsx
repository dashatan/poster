import { useState } from "react";
import { categories } from "../../../app/static/categories";
import FormFieldCard from "../../molecules/cards/FormFieldCard";
import SelectField from "../../molecules/inputs/SelectField";
import TextField from "../../molecules/inputs/TextField";
import PhoneTopHeader from "../../organisms/headers/PhoneTopHeader";
import { ListItem } from "./SelectiveList";
import cities from "../../../app/static/iran/cities.json";
import { createPostFields } from "../../../app/static/fileds/createPostFields";
import { filters } from "../../../app/static/filters";
import FormElement from "../../organisms/forms/FormElement";

export interface CreatePostProps {}
export default function CreatePost(props: CreatePostProps) {
    const [filter, setFilter] = useState(filters);
    console.log(filter);
    console.log("render");

    function handleChange(key: string, value: string) {
        setFilter({ ...filter, [key]: value });
    }

    return (
        <div className="h-screen">
            <PhoneTopHeader text="Add new post" withBackBtn />
            <div className="h-[calc(100%_-_theme(space.10))] p-2 bg-light-2 dark:bg-dark-6 text-dark-8 dark:text-dark-4">
                {createPostFields.map((el) => (
                    <FormElement
                        key={el.label}
                        elementType={el.elementType}
                        label={el.label}
                        value={filter[el.label]}
                        options={el.options || []}
                        asOptionTitle={el.asTitle}
                        asValue={el.asValue}
                        onChange={handleChange}
                        withSearch={el.withSearch}
                    />
                ))}
            </div>
        </div>
    );
}
