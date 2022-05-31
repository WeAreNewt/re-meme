type ConfirmModalProps = {
    show: boolean;
    onClose?: () => void
    onConfirm: (status: boolean) => void
}

export const ConfirmModal = ({ show, onClose, onConfirm }: ConfirmModalProps) => {

    const handleCancel = () => {
        onConfirm(false);
    }

    const handleConfirm = () => {
        onConfirm(true);
    }

    return (
        <div className={show ? "block" : "hidden"}>
            <div className="absolute h-screen w-screen z-20 flex items-center justify-center create-btn-gradient-transparent px-4 lg:px-0">
                <div className="comic-border rounded-4xl bg-white n:p-4 lg:p-10">
                    <h3 className="text-3xl text-center font-extrabold lg:whitespace-pre-line px-0 lg:px-8">{"Are you sure you want\n to remix?"}</h3>
                    <p className="text-lg text-center whitespace-pre-line px-0 lg:px-8">This remix will live on Lens forever</p>
                    <div className="flex justify-center items-center space-x-4 mt-8">
                        <button onClick={handleConfirm} className="comic-border-mini rounded-full bg-purple px-6 py-2 font-bold">Remix</button>
                        <button onClick={handleCancel} className="comic-border-mini rounded-full bg-white px-6 py-2 font-bold">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}