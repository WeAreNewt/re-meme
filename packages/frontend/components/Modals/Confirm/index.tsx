type ConfirmModalProps = {
    show: boolean;
    setShow: (show: boolean) => void
    onConfirm: () => void
}

export const ConfirmModal = ({ show, setShow, onConfirm }: ConfirmModalProps) => {

    const handleCancel = () => {
        setShow(false);
    }

    return (
        <div onMouseDown={() => setShow(false)} className={`${show ? "block" : "hidden"} fixed h-screen w-screen z-20 flex items-center justify-center create-btn-gradient-transparent px-4 lg:px-0 top-0 left-0`}>
            <div onMouseDown={(e) => e.stopPropagation()} className="comic-border rounded-4xl bg-white n:p-4 lg:p-10">
                <h3 className="text-3xl text-center font-extrabold lg:whitespace-pre-line px-0 lg:px-8">{"Are you sure you want\n to remix?"}</h3>
                <p className="text-lg text-center whitespace-pre-line px-0 lg:px-8">This remix will live on Lens forever</p>
                <div className="flex justify-center items-center space-x-4 mt-8">
                    <button onClick={handleCancel} className="comic-border-mini rounded-full bg-white px-6 py-2 font-bold">Cancel</button>
                    <button onClick={onConfirm} className="comic-border-mini rounded-full bg-purple px-6 py-2 font-bold">Remix</button>
                </div>
            </div>
        </div>
    )
}