import { ReactNode } from "react";

export interface ButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}
const Button = ({ children, className, onClick }: ButtonProps) => {
    return (
        <div
            className={`${className ? className : ""} w-20 p-2 text-base border-2 border-dark-2 rounded-lg flex justify-around align-middle`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Button;