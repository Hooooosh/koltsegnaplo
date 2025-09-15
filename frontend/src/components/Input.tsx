import { useEffect, useState } from "react"

export type InputTypes = "string" | "number"

export function Input(
    { callback, type, defaultValue = "", disabled = false, placeholder = "", min, max }:
        {
            callback: (e: string) => void,
            type: InputTypes,
            defaultValue?: string,
            disabled?: boolean,
            placeholder?: string,
            min?: number,
            max?: number
        }
) {

    const [value, setValue] = useState<string>(defaultValue)

    /* revalidate input if min or max changes from outside */
    useEffect(() => {
        validateInput(value)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [min, max])

    function validateInput(e: string) {
        let newValue = value

        /* stop validation if empty */
        if (e === "") {
            setValue(e)
            return;
        }

        if (type === "number") {
            /* test if valid number */
            if (e === "-" || /^-?\d*$/.test(e)) {
                /* valid number or soon-to-be negative number, let input go through */
                newValue = e

                /* only clamp to min-max if number actually exists */
                const num = parseInt(e)
                if (min !== undefined) {
                    /* catch negative number if minimum is positive */
                    if (e.includes("-") && min > 0) {
                        newValue = min.toString()
                    }
                    else if(e !== "-"){
                        newValue = (num < min ? min : num).toString()
                    }
                }
                if (max !== undefined && e !== "-") {
                    newValue = (num > max ? max : num).toString()
                }
            }
        }
        else {
            newValue = e
        }
        setValue(newValue)
    }

    function onInput(e: string) {
        validateInput(e)
        // Use the event value directly for logging
    }

    /* call cb on value change */
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
            style={{
                outlineColor: "var(--primary) !important"
            }}
            className={`
                ${value === "" && "empty"}
                border-0
				duration-100
                rounded-md py-2.5 px-5
                min-w-[50px] w-full
                ring-1
                text-sm
                text-black/50 focus:text-black
                ${!disabled && "shadow-sm shadow-gray-500/40 ring-gray-500/30"} 
				${disabled && "cursor-not-allowed bg-transparent border-none ring-gray-500/10 opacity-70 ring-1 line-through"}`}
        />
    )
}