import useWindowDimensions from "../../hooks/window-dimensions.hook";

type UpdateCollectButtonProps = {
    disabled: boolean,
    onUpdateCollectClicked: () => void;
}

export const UpdateCollectButton = ({disabled, onUpdateCollectClicked}: UpdateCollectButtonProps) => {
    const { height, width } = useWindowDimensions();

    return (
        <button onClick={onUpdateCollectClicked} disabled={disabled} className={"flex items-center bg-purple rounded-full p-3 border-black border-2 border-solid min-w-fit max-h-6 " + (disabled ? "opacity-30" : "comic-border-mini")}>Collect settings</button>
     
    )
}