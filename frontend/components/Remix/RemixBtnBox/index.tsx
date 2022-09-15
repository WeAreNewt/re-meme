import { useSelector } from "react-redux";
import { User } from "../../../models/User/user.model";
import { RootState } from "../../../store/store";

type RemixBtnBoxProps = {
    onRemixBtnClicked: () => void;
}

export const RemixBtnBox : React.FC<RemixBtnBoxProps> = ({ onRemixBtnClicked }) => {
    const user = useSelector<RootState, User | null>((state) => state.user.selectedUser);

    return (
        <div className="main-container items-center">
            <p className={"text-subtitle-2 text-center " + (!user ? "opacity-30" : "")}>HAVE ANOTHER IDEA FOR THIS?</p>
            <button disabled={!user} onClick={onRemixBtnClicked} className="btn-large-tertiary w-full">REMIX THIS MEME</button>
        </div>
    )
}