import Image from "next/image";
import useWindowDimensions from "../../hooks/window-dimensions.hook";

type RemixCountProps = {
    count: number,
    handleClick: () => void
}

export const RemixCount = ({count, handleClick}: RemixCountProps) => {
    const { height, width } = useWindowDimensions();

    return (
        <button disabled={count === 0} onClick={handleClick} className={"flex items-center bg-white rounded-full p-3 border-black border-2 border-solid min-w-fit max-h-6 comic-border-mini"}>
            {
                width > 850 ? (
                    <div className="flex items-center space-x-2">
                        <Image src="/assets/icons/remix.svg" width={"20"} height={"20"} />
                        <span>{`${count} remixes`}</span>
                    </div>
                )
                :
                <div className="flex items-center space-x-2">
                    <Image src="/assets/icons/remix.svg" width={"20"} height={"20"} />
                    <span>{count}</span>
                </div>
            }
        </button>
    )
}