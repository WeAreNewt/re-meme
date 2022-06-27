import useWindowDimensions from "../../../hooks/window-dimensions.hook"

interface State {
    index: number,
    open: boolean
}

interface EditTextModalProps {
    index: number
    open: boolean
    setOpen: ({index, open}: State) => void
    deleteText: (index: number) => void
}

const EditTextModal : React.FC<EditTextModalProps> = ({ index, open, setOpen, deleteText }) => {

    const { width } = useWindowDimensions()
    const isSmallScreen = width < 850

    const onDelete = () => {
        deleteText(index)
        setOpen({ index: 0, open: false})
    }

    const Modal = () => (
        <div
            onMouseDown={(e) => e.stopPropagation()}
            className={`comic-border rounded-4xl bg-white p-4 flex flex-col`}
        >
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold mb-0">{`Edit Text #${index + 1}`}</h3>
                {
                    isSmallScreen ? (
                        <button onClick={() => setOpen({ index: 0, open: false})}>
                            <img src="/assets/icons/x.png"/>
                        </button>
                    ) : (
                        <button className="rounded-4xl bg-alert-red comic-border-mini p-2 border-2" onClick={onDelete}>
                            <img src="/assets/icons/trash-can.svg"/>
                        </button>
                    )
                }
            </div>
            <span>Choose font</span>
            <select className="border-2 border-black border-solid rounded-xl p-2 mb-2 h-12">
                <option>Mock 1</option>
                <option>Mock 2</option>
            </select>
            <div className="flex mb-2 gap-2">
                <div className="w-1/2">
                    <span>Font color</span>
                    <div className="border-2 border-black border-solid rounded-xl flex h-12 overflow-hidden">
                        <div className="w-12 border-black border-solid border-r-2 rounded-r-xl bg-white" />
                        <input className="text-center focus:outline-none" />
                    </div>
                </div>
                <div className="w-1/2">
                    <span>Shadow color</span>
                    <div className="border-2 border-black border-solid rounded-xl flex h-12 overflow-hidden">
                        <div className="w-12 border-black border-solid border-r-2 rounded-r-xl bg-white" />
                        <input className="text-center focus:outline-none" />
                    </div>
                </div>
            </div>
            { isSmallScreen && (
                <button className="rounded-4xl bg-alert-red comic-border-mini p-2 border-2 self-center mt-3" onClick={onDelete}>
                    <img src="/assets/icons/trash-can.svg"/>
                </button>
            )}
        </div>
    )

    return (
            <div className={`${open ? "block" : "hidden"} ${isSmallScreen ? 'w-full' : ''}`}>
                {
                    isSmallScreen ? <Modal /> :
                    (
                        <div onMouseDown={() => setOpen({ index: 0, open: false})}
                            className={`${isSmallScreen ? 'static' :  'fixed'} h-screen w-screen z-20 flex items-center justify-center create-btn-gradient-transparent top-0 left-0`}
                        >
                            <Modal />
                        </div>
                    )
                }
            </div>
    );
}

export default EditTextModal;