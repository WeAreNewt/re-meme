import { PublicationData } from "../../../models/Publication/publication.model";

type ConfirmModalProps = {
    show: boolean;
    setShow: (show: boolean) => void
    onConfirm: () => void
    publication?: PublicationData
}

export const ConfirmModal = ({ show, setShow, onConfirm, publication }: ConfirmModalProps) => {

    const handleCancel = () => {
        setShow(false);
    }

    return (
        <div onMouseDown={() => setShow(false)} className={`${show ? "block" : "hidden"} fixed h-screen w-screen z-20 flex items-center justify-center create-btn-gradient-transparent px-4 lg:px-0 top-0 left-0`}>
            <div onMouseDown={(e) => e.stopPropagation()} className="main-container lg:w-[492px]">
                <h3 className="text-subtitle-1 mb-[20px] text-center">{publication ? "Are you sure you want\n to remix?" : "Are you sure you want to continue?"}</h3>
                <p className="text-body-2-medium mb-[32px] text-center">{publication ? "This remix will live on Lens forever" : "This meme will live on Lens forever"}</p>
                <div className="flex justify-center items-center gap-[24px]">
                    <button onClick={handleCancel} className="btn-medium-secondary">Cancel</button>
                    <button onClick={onConfirm} className="btn-medium">{publication ? 'Remix' : 'Create'}</button>
                </div>
            </div>
        </div>
    )
}