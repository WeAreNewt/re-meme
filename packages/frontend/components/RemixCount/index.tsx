import Image from "next/image";
import useWindowDimensions from "../../hooks/window-dimensions.hook";

type RemixCountProps = {
    count: number,
    disabled: boolean
}

export const RemixCount = ({count, disabled}: RemixCountProps) => {
    const { height, width } = useWindowDimensions();

    return (
        <div className={"flex items-center bg-white rounded-full p-3 border-black border-2 border-solid min-w-fit max-h-6 " + (disabled ? "opacity-30" : "comic-border-mini")}>
            {
                width > 850 ?
                <span>{`${count} remixses`}</span>
                :
                <div className="flex items-center space-x-2">
                    <Image src="/assets/icons/remix.svg" width={"20"} height={"20"} />
                    <span>{count}</span>
                </div>
            }
        </div>
    )
}