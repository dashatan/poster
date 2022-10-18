export interface FormFieldCardProps {
    clicked?: boolean;
    children?: JSX.Element;
    label: string;
    onClick?: () => void;
}

export default function FormFieldCard(props: FormFieldCardProps) {
    return (
        <div
            className={`relative h-20 flex items-center group ${
                props.clicked && "clicked"
            }`}
            onClick={props.onClick}
        >
            <div className="pointer-events-none flex justify-center items-center absolute transition-all rounded-md h-6 ltr:left-4 rtl:right-4 top-7 group-clicked:top-0 text-xl group-clicked:text-base px-2 bg-light-2 dark:bg-dark-6 text-dark-6 dark:text-dark-4">
                {props.label || "Form Field"}
            </div>
            <div
                className={`flex justify-between items-center px-6 w-full h-14 rounded-md cursor-pointer border-2 border-dark-6 dark:border-dark-4 group ${
                    props.clicked && "clicked"
                }`}
            >
                {props.children}
            </div>
        </div>
    );
}
