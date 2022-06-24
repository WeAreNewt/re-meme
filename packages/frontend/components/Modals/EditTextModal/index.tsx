interface State {
    index: number,
    open: boolean
}

interface EditTextModalProps {
    index: number
    open: boolean
    setOpen: ({index, open}: State) => void
}

const EditTextModal : React.FC<EditTextModalProps> = ({ index, open, setOpen }) => {

    return (
            <div className={open ? "block" : "hidden"}>
                <div onMouseDown={() => setOpen({ index: 0, open: false})} className="absolute h-screen w-screen z-20 flex items-center justify-center create-btn-gradient-transparent px-4 lg:px-0">
                    <div onMouseDown={(e) => e.stopPropagation()} className="comic-border rounded-4xl bg-white n:p-4 lg:p-10 flex flex-col">
                        <h3 className="text-lg font-bold">{`Edit Text #${index + 1}`}</h3>
                        <span>Choose font</span>
                        <select className="border-2 border-black border-solid rounded-xl p-2 mb-2">
                            <option>Mock 1</option>
                            <option>Mock 2</option>
                        </select>
                        <div className="flex gap-10 mb-2">
                            <div>
                                <span>Font color</span>
                                <div className="border-2 border-black border-solid rounded-xl flex">
                                    <div className="w-8 border-r-2 border-black border-solid rounded-xl bg-black" />
                                    <input />
                                </div>
                            </div>
                            <div>
                                <span>Shadow color</span>
                            </div>
                        </div>
                        <div className="flex">
                            <span>Size</span>
                            <span className="ml-auto">20px</span>
                        </div>
                        <input id="small-range" type="range" value="50" className="mb-6 w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"></input>
                    </div>
                </div>
            </div>
    );
}

export default EditTextModal;