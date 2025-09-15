export default function CardWrapper(
    { children, title, iconSrc, closeOnIdle = false }:
        {
            children: React.ReactNode,
            title: string,
            iconSrc?: string,
            closeOnIdle?: boolean
        }) {
    return (
        <div className={`border border-neutral-500/20 flex flex-col bg-white rounded-xl overflow-clip shadow-md ${closeOnIdle && "card-close-on-idle"}`}>
            <div className="shadow-sm py-4 px-7 font-medium tracking-wide flex items-center gap-4">
                {
                    iconSrc &&
                    <img className="h-5 -ml-2" src={iconSrc} />
                }
                {title}
            </div>

            <div className={`card-children ${closeOnIdle && "max-h-[400px] duration-1000"}`}>
                {children}
            </div>
        </div>
    )
}