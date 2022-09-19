import paths from "./paths";

const Icon = (props: any) => {
    const iconPaths: string[] = paths[props.name as keyof object];

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={props.className}
        >
            {iconPaths.map((path, index) => {
                return (
                    <path
                        key={index}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={path}
                    />
                );
            })}
        </svg>
    );
};

export default Icon;
