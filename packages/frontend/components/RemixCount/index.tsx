type RemixCountProps = {
    count: number;
}

export const RemixCount = ({count}: RemixCountProps) => {
    return (
        <div className="flex items-center bg-white rounded-full p-3 border-gray-200 border-2 border-solid min-w-fit max-h-6">
            <span className="text-gray-200 text-base">{`${count} remixses`}</span>
        </div>
    )
}