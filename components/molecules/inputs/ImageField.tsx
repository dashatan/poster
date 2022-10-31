/* eslint-disable @next/next/no-img-element */
import { CameraIcon, TrashIcon } from "@heroicons/react/24/outline";
import { randomUUID } from "crypto";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Alert from "../alerts/Alert";
import Expire from "../alerts/Expire";

export interface ImageFieldProps {
    label: string;
    value?: string;
    type?: string;
    max?: number;
    onChange?: (key: string, value: string) => void;
}

export interface Info {
    name: string;
    file: File;
    path: string;
    validation: Validation;
}

export interface Validation {
    isValid: boolean;
    message: string;
}

export default function ImageField(props: ImageFieldProps) {
    const [files, setFiles] = useState<Info[]>([]);
    const [alert, setAlert] = useState({ show: false, message: "" });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const max = props.max || 8;

    async function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const filesObj = e.target.files;
        if (!filesObj) return;
        const filesArr: File[] = Object.values(filesObj);
        const filePromise = filesArr.map((file) => validate(file).then((res) => res));
        const res = await Promise.all(filePromise);
        const newFiles = [...files, ...res];
        newFiles.length = newFiles.length > max ? max : newFiles.length;
        newFiles.map((file) => {
            !file.validation.isValid &&
                setAlert({
                    show: true,
                    message: "Some of images are not acceptable, pleas consider instruction while choosing images",
                });
        });

        setFiles(newFiles.filter((x) => x.validation.isValid));
        e.target.value = "";
    }

    function handleClick() {
        if (fileInputRef.current) fileInputRef.current.click();
    }

    function validate(file: File) {
        return new Promise<Info>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (!e.target || !e.target.result || typeof e.target.result !== "string") return;

                const result = { name: `${Math.random()}_${file.name}`, file, path: e.target.result };
                imageSizeValidation(e).then((res) => resolve({ ...result, validation: res }));
            };
            reader.readAsDataURL(file);
        });
    }

    function imageSizeValidation(e: ProgressEvent<FileReader>) {
        return new Promise<Validation>((resolve) => {
            if (!e.target || !e.target.result || typeof e.target.result !== "string") return;
            const result = e.target.result;
            const image = new Image();
            image.src = result;
            image.onload = function () {
                if (image.width < 600 && image.height < 600) {
                    resolve({
                        isValid: false,
                        message: `image size should be larger than 600x600 , the image size is ${image.width}x${image.height}`,
                    });
                } else if (image.width > 2000 && image.height > 2000) {
                    resolve({
                        isValid: false,
                        message: `image size should not be larger than 2000x2000 , the image size is ${image.width}x${image.height}`,
                    });
                } else if (image.width < image.height) {
                    resolve({
                        isValid: false,
                        message: `image must be horizontal , the image size is ${image.width}x${image.height}`,
                    });
                } else {
                    resolve({
                        isValid: true,
                        message: `image is acceptable , the image size is ${image.width}x${image.height}`,
                    });
                }
            };
        });
    }

    function removeFile(file: Info) {
        setFiles((files) => files.filter((x) => x.name !== file.name));
    }

    const classes = {
        imageContainer: [
            "w-16",
            "h-16",
            "p-0.5",
            "flex",
            "justify-center",
            "items-center",
            "border-2",
            "border-dashed",
            "rounded-lg",
        ],
    };

    return (
        <div className="">
            <div className="px-2 pb-4">{props.label}</div>
            <div className="flex flex-wrap gap-4 border rounded-lg p-2">
                {files.length < max && (
                    <div className={classes.imageContainer.join(" ")} onClick={handleClick}>
                        <CameraIcon className="w-8" />
                    </div>
                )}
                {files.map((file) => (
                    <div key={file.name} className={classes.imageContainer.join(" ") + " relative"}>
                        <div
                            className="w-6 h-6 bg-light-2 absolute -top-2 -right-2 flex justify-center items-center rounded-full"
                            onClick={() => removeFile(file)}
                        >
                            <TrashIcon className="w-4 text-red-6" />
                        </div>
                        <div
                            style={{ backgroundImage: `url(${file.path})` }}
                            className="w-full h-full bg-cover bg-center rounded-lg"
                        />
                    </div>
                ))}
            </div>
            <form>
                <input
                    ref={fileInputRef}
                    type={"file"}
                    accept={"image/*"}
                    multiple
                    className="hidden"
                    onChange={handleChange}
                />
            </form>
            {alert.show && (
                <Expire delay={6000} key={Math.random()} onExpire={() => setAlert({ show: false, message: "" })}>
                    <Alert color="red" text={alert.message} />
                </Expire>
            )}
        </div>
    );
}
