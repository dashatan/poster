import { ReactNode } from "react";

export default function PostCardImage({ children }: { children: ReactNode }) {
    return (
        <div className="flex content-center justify-center h-full min-w-32">
            {children}
        </div>
    );
}
    