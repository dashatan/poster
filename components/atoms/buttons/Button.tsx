import { ReactNode } from "react";

export interface ButtonProps {
    label: string;
    color?: "blue" | "red" | "green";
    onClick?: () => void;
}
const Button = (props: ButtonProps) => {
    const classes = [
        "w-full",
        "h-10",
        "p-2",
        "border-2",
        `bg-${props.color || "blue"}-4`,
        "text-dark-8",
        "border-dark-6",
        "rounded-lg",
        "flex",
        "justify-around",
        "items-center",
    ];

    return (
        <div className={classes.join(" ") + ""} onClick={props.onClick}>
            {props.label}
        </div>
    );
};

export default Button;
