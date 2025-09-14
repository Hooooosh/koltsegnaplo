export default function Button(
    { htmlKey, value, onClick, latchBehaviour = false, isLatchActive = false, disabled = false, color = "normal" }:
        {
            htmlKey?: string,
            value: string,
            onClick: () => void,
            latchBehaviour?: boolean,
            isLatchActive?: boolean,
            disabled?: boolean,
            color?: "normal" | "success" | "warning" | "error",
        }
) {
    return <button
        key={htmlKey ? htmlKey.toString() : 0}
        className={`
            button-${color}
            select-none shadow-md ring-0 ring-[#d1d5db7a] cursor-pointer py-2.5 px-5 rounded-md text-center capitalize duration-100
            ${!disabled && "hover:brightness-90 active:scale-95"}
            ${/* toggle off */ latchBehaviour && !isLatchActive && "!bg-white hover:shadow-md hover:ring-2 hover:ring-[var(--primary)] hover:text-[var(--primary)] hover:scale-[105%]"}
            ${/* toggle on */ latchBehaviour && isLatchActive && "!bg-[var(--primary)] !text-white"}
            ${/* normal */ !latchBehaviour && `!text-white`}
            ${disabled && "opacity-50 grayscale-100 !cursor-not-allowed"}
            `}
        onClick={disabled ? undefined : onClick}>
        {value}
    </button>
}