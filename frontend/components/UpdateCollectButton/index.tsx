type UpdateCollectButtonProps = {
    onUpdateCollectClicked: () => void;
}

export const UpdateCollectButton = ({onUpdateCollectClicked}: UpdateCollectButtonProps) => {

    return (
        <button onClick={onUpdateCollectClicked} className="icon-btn-small lg:btn-with-icon-small lg:w-auto">
            <img src="/assets/icons/gear.svg" className="icon-sm" />
            <span className="hidden lg:block">Settings</span>
        </button>

    )
}
