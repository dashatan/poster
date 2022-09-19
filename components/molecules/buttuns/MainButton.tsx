export const MainButton = (props: any) => {
    return (
        <div
            className={`${props.className ? props.className : ""} w-20 h-7 border-2 border-blue-200 rounded-md flex justify-around align-middle`}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    );
};
