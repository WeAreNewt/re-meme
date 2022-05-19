import { useAccount } from "wagmi";
import { RemixBtn } from "../RemixBtn"

export const RemixBtnBox = () => {
    const { data } = useAccount();

    const handleClick = () => {

    }

    return (
        <div className="comic-border bg-white p-10 rounded-4xl text-center">
            <p className={"text-lg " + (data ? "" : "opacity-30")}>HAVE ANOTHER IDEA FOR THIS?</p>
            <RemixBtn onClick={handleClick} disabled={!data} />
        </div>
    )
}