interface EditTextModalProps {
    index: number
    open: boolean
}

const EditTextModal : React.FC<EditTextModalProps> = ({ index, open }) => {
    return (
            <div className={open ? "block" : "hidden"}>
                <div className="absolute h-screen w-screen z-20 flex items-center justify-center create-btn-gradient-transparent px-4 lg:px-0">
                    <div className="comic-border rounded-4xl bg-white n:p-4 lg:p-10 flex flex-col">
                        <h3 className="text-3xl text-center font-extrabold lg:whitespace-pre-line px-0 lg:px-8">{`Edit Text #${index + 1}`}</h3>
                        <span>Font</span>
                        <select></select>
                        <div className="flex gap-10">
                            <div>
                                <span>Font color</span>
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