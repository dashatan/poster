/* eslint-disable react-hooks/exhaustive-deps */
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ReactNode, useEffect, useState } from "react";

export interface ExpireProps {
    children: ReactNode;
    delay: number;
    onExpire: () => void;
}

export default function Expire(props: ExpireProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setTimer(props.delay);
    }, []);

    const setTimer = (delay: number) => {
        setTimeout(hide, delay);
    };

    const hide = () => {
        setIsVisible(false);
        props.onExpire();
    };

    return isVisible ? (
        <div className="fixed bottom-0 left-0 w-screen">
            <div className="w-full h-full relative p-4">
                <div className="absolute top-6 right-6 p-1 rounded-full bg-light-2" onClick={hide}>
                    <XMarkIcon className="w-4 text-red-6" />
                </div>
                {props.children}
            </div>
        </div>
    ) : (
        <></>
    );
}
