export interface AlertProps {
    color: "red" | "green" | "blue";
    text: string;
}
export default function Alert(props: AlertProps) {
    return (
        <div className={"w-full p-8 text-center rounded-lg flex justify-center items-center" + ` bg-${props.color}-4`}>
            {props.text}
        </div>
    );
}
