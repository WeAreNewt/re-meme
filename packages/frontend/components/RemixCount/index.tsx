type RemixCountProps = {
    count: number,
    disabled: boolean
}

export const RemixCount = ({count, disabled}: RemixCountProps) => {
    return (
        <div className={"flex items-center bg-white rounded-full p-3 border-black border-2 border-solid min-w-fit max-h-6 " + (disabled ? "opacity-30" : "comic-border-mini")}>
            <span>{`${count} remixses`}</span>
        </div>
    )
}