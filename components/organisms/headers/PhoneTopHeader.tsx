import { ArrowLeftIcon, TvIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

export interface PhoneTopHeaderProps {
    text: string;
    withBackBtn?: boolean;
    withCloseBtn?: boolean;
    onBackBtnClick?: () => void;
}

export default function PhoneTopHeader(props: PhoneTopHeaderProps) {
    const router = useRouter();
    const classes = [
        "flex",
        "gap-4",
        "px-6",
        "py-4",
        "w-full",
        "h-10",
        "items-center",
        "shadow-md",
        "dark:shadow-none",
        "cursor-pointer",
        "text-dark-8",
        "bg-light-4",
        "dark:bg-dark-8",
        "dark:text-dark-4",
    ];
    return (
        <div className={classes.join(" ") + ""}>
            <div>
                {props.withBackBtn && (
                    <ArrowLeftIcon className="w-6 rtl:rotate-180" onClick={props.onBackBtnClick || router.back} />
                )}
                {props.withCloseBtn && (
                    <XMarkIcon className="w-6 rtl:rotate-180" onClick={props.onBackBtnClick || router.back} />
                )}
            </div>
            <div>{props.text}</div>
        </div>
    );
}
