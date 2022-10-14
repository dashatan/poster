import { ArrowLeftIcon, TvIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

export interface PhoneTopHeaderProps {
    text: string;
    withBackBtn?: boolean;
}

const PhoneTopHeader = ({ text, withBackBtn }: PhoneTopHeaderProps) => {
    const router = useRouter();
    return (
        <div className="flex gap-4 p-2 w-full h-10 items-center shadow-md dark:shadow-nonecursor-pointer text-dark-8 bg-light-4 dark:bg-dark-8 dark:text-dark-4">
            <div>
                {withBackBtn && <ArrowLeftIcon className="w-6" onClick={router.back} /> }
            </div>
            <div>{text}</div>
        </div>
    );
};

export default PhoneTopHeader;
