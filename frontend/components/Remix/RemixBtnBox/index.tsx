import { useSelector } from "react-redux";
import { RootState } from "../../../lib/redux/store";

type RemixBtnBoxProps = {
    onRemixBtnClicked: () => void;
}

export const RemixBtnBox : React.FC<RemixBtnBoxProps> = ({ onRemixBtnClicked }) => {
    const selectedProfile = useSelector<RootState>((state) => state.user.selectedProfile);

    return (
        <div className="main-container items-center">
            <p className={"text-subtitle-2 text-center " + (!selectedProfile ? "opacity-30" : "")}>HAVE ANOTHER IDEA FOR THIS?</p>
            <button disabled={!selectedProfile} onClick={onRemixBtnClicked} className="btn-large-tertiary w-full">REMIX THIS MEME</button>
        </div>
    )
}