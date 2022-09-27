import Image from "next/image";
import useWindowDimensions from "../../lib/hooks/window-dimensions.hook";

type RemixCountProps = {
    count: number,
    handleClick: () => void
}

export const RemixCount = ({count, handleClick}: RemixCountProps) => {
    const { height, width } = useWindowDimensions();

    return (
        <button disabled={count === 0} onClick={handleClick} className={"btn-with-icon-small-secondary"}>
            <img src="/assets/icons/remix.svg" className="icon-sm" />
            {
                width > 850 ? <span>{`${count} remixes`}</span>
                :
                <span>{count}</span>
            }
        </button>
    )
}