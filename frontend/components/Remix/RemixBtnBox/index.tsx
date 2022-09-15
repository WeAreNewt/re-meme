import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

type RemixBtnBoxProps = {
    onRemixBtnClicked: () => void;
}

export const RemixBtnBox : React.FC<RemixBtnBoxProps> = ({ onRemixBtnClicked }) => {
    const data = useAccount();
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setDisabled(!data ? true : false)
    }, [data])

    return (
        <div className="main-container items-center">
            <p className={"text-subtitle-2 text-center " + (disabled ? "opacity-30" : "")}>HAVE ANOTHER IDEA FOR THIS?</p>
            <button disabled={disabled} onClick={onRemixBtnClicked} className="btn-large-tertiary w-full">REMIX THIS MEME</button>
        </div>
    )
}