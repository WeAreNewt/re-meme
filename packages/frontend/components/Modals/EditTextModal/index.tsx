import { ChangeEventHandler } from "react"
import { fabric } from 'fabric'

interface State {
    index: number,
    open: boolean
}

export interface TextConfig {
    shadowColor?: string
    textColor?: string
    font?: string
}

interface EditTextModalProps {
    index: number
    open: boolean
    setOpen: ({index, open}: State) => void
    deleteText: (index: number) => void,
    text: fabric.Text,
    setConfig: (newConfig: TextConfig, index: number) => void
}

export const EditText : React.FC<EditTextModalProps> = ({ index, setOpen, deleteText, text, setConfig }) => {
    const onDelete = () => {
        deleteText(index)
        setOpen({ index: 0, open: false})
    }

    const setFont: ChangeEventHandler<HTMLSelectElement> = e => {
        setConfig({
            textColor: (text.fill as string),
            shadowColor: (text.fill as string),
            font: e.target.value
        },
        index
        )
    }

    const setTextColor: ChangeEventHandler<HTMLInputElement> = e => {
        setConfig({
            textColor: e.target.value,
            shadowColor: e.target.value,
            font: text.fontFamily
        }, 
        index
        )  
    }

    return (
        <div
            onMouseDown={(e) => e.stopPropagation()}
            className='comic-border rounded-4xl bg-white p-4 flex flex-col w-full lg:w-1/3'
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">{`Edit text #${index + 1}`}</h3>
                <button onClick={() => setOpen({ index: 0, open: false})} className="lg:hidden">
                    <img src="/assets/icons/x.png"/>
                </button>
                <button className="rounded-4xl bg-alert-red comic-border-mini p-2 border-2 hidden lg:block" onClick={onDelete}>
                    <img src="/assets/icons/trash-can.svg"/>
                </button>
            </div>
            <span>Choose font</span>
            <select
                value={text.fontFamily}
                className="border-2 border-black border-solid rounded-xl p-2 mb-2 h-12"
                onChange={setFont}
            >
                <option value="Helvetica">Helvetica</option>
                <option value="Comic Sans MS">Comic Sans</option>
                <option value="Times New Roman">Times New Roman</option>
            </select>
            <div className='flex flex-col lg:flex-row gap-2'>
                <div className='w-full lg:w-1/2 flex flex-col'>
                    <span>Font color</span>
                    <div className="flex w-full h-12 items-stretch border-2 rounded-xl overflow-hidden">
                        <button style={{ backgroundColor: `${(text.fill as string)}`}} className={`w-12 lg:w-16 rounded-r-xl border-r-2 border-black`} />
                        <input onChange={setTextColor} value={`${(text.fill as string)}`} type="text" className="min-w-0 w-full text-center focus:outline-none" />
                    </div>
                </div>
                <div className='w-full lg:w-1/2 flex flex-col'>
                    <span>Shadow color</span>
                    <div className="flex w-full h-12 items-stretch border-2 rounded-xl overflow-hidden">
                    <button style={{ backgroundColor: `${(text.fill as string)}`}} className={`w-12 lg:w-16 rounded-r-xl border-r-2 border-black`} />
                        <input onChange={setTextColor} value={`${(text.fill as string)}`} type="text" className="min-w-0 w-full text-center focus:outline-none" />
                    </div>
                </div>
            </div>
            <button className="lg:hidden rounded-4xl bg-alert-red comic-border-mini p-2 border-2 self-center mt-3" onClick={onDelete}>
                <img src="/assets/icons/trash-can.svg"/>
            </button>
        </div>
    )
}

const EditTextModal : React.FC<EditTextModalProps> = (props) => {

    const { open, setOpen } = props

    return (
            <div
                onMouseDown={() => setOpen({ index: 0, open: false})}
                className={`${open ? "block" : "hidden"} absolute h-full w-full z-20 top-0 left-0`}
            >
                <div onMouseDown={() => setOpen({ index: 0, open: false})}
                    className='static flex justify-end mr-20 mt-60'
                >
                    <EditText {...props} />
                </div>
            </div>
    );
}

export default EditTextModal;