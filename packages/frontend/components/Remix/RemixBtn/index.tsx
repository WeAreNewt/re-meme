import { useAccount } from 'wagmi';
import styles from '../../../styles/btns.module.css';

type RemixBtnProps = {
    btnText?: string,
    onClick: () => void,
    disabled: boolean
}

export const RemixBtn = ({btnText, onClick, disabled}: RemixBtnProps) => {    
    return (
        <button onClick={onClick} disabled={disabled}  className={"create-btn-gradient rounded-full border-black border-solid border-4 px-16 sm:px-16 lg:px-20 py-3 text-lg " + (!disabled ? "" : "opacity-30")}>
            { btnText || "REMIX THIS MEME" }
        </button>
    )
}