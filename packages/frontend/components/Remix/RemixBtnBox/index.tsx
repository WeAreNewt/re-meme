import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { RemixBtn } from "../RemixBtn"

type RemixBtnBoxProps = {
    onRemixBtnClicked: () => void;
}

export const RemixBtnBox = ({onRemixBtnClicked}: RemixBtnBoxProps) => {
    const { data } = useAccount();
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setDisabled(!data ? true : false)
    }, [data])

    return (
        <div className="comic-border bg-white n:p-4 lg:p-10 rounded-4xl text-center">
            <p className={"text-lg " + (disabled ? "opacity-30" : "")}>HAVE ANOTHER IDEA FOR THIS?</p>
            <RemixBtn onClick={onRemixBtnClicked} disabled={disabled} />
        </div>
    )
}