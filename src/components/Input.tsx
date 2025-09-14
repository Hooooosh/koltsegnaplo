import { useEffect, useState } from "react"

export type InputTypes = "string" | "number"

export function Input(
    { callback, type, defaultValue = "", disabled = false, placeholder = "" }:
        {
            callback: (e: string) => void,
            type: InputTypes,
            defaultValue?: string,
            disabled?: boolean,
            placeholder?: string,
        }
) {

    const [value, setValue] = useState(defaultValue)

    function validateInput(e: string) {
        if (type === "number") {
            if (e === "" || e === "-" || /^-?\d*$/.test(e)) {
                setValue(e);
            }
        }
        else {
            setValue(e)
        }
    }

    function onInput(e: string) {
        validateInput(e)
        // Use the event value directly for logging
    }

    useEffect(() => {
        callback(value)
    }, [callback, value])

    return (
        <input
            disabled={disabled}
            onChange={(e) => onInput(e.currentTarget.value)}
            value={value}
            type={"text"}
            placeholder={placeholder}
            className={`
                ${value === "" && "empty"}
                shadow-md shadow-gray-500/10
				duration-100
				focus:ring-2 focus:ring-[var(--primary)]
                rounded-md py-2.5 px-5
                min-w-[50px] w-full
                ring-gray-500/10 ring-1
                text-sm
				${disabled && "cursor-not-allowed bg-transparent border-none ring-gray-500/10 opacity-70 ring-1"}`}
        />
    )
}