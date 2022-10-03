import Image from "next/future/image";
import { ChangeEvent } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import reorderIcon from '../../public/assets/icons/reorder.svg'
import closeIcon from '../../public/assets/icons/close.svg'
import settingsIcon from '../../public/assets/icons/settings.svg'

interface TextProps {
    object: fabric.Text
    index: number
    onChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void
    onButtonClick: (index: number) => void
}

const DraggableText : React.FC<TextProps> = ({ object, index, onChange, onButtonClick }) => {
    return (
        <Draggable draggableId={object.id} index={index}>
            {
                (provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        { ...provided.draggableProps }
                        className="w-full flex"
                    >
                        <div
                            className={`group border-[2px] border-black border-solid rounded-xl mb-[16px] flex p-[10px] pr-[16px] w-full bg-white ${snapshot.isDragging ? 'border-[2px] border-alert-green p-[10px] pr-[14px] -rotate-6 w-[100px] ml-auto' : ''} `}
                        >
                            <input
                                onChange={e => onChange(e, index)}
                                className="w-full focus:outline-none"
                                placeholder={`Text #${object.typeIndex + 1}`}
                                value={object.text}
                            />
                            {
                                !snapshot.isDragging && (
                                    <>
                                        <Image { ...provided.dragHandleProps } src={reorderIcon} alt="reorder" className={`icon-md hidden group-hover:flex ml-auto`} />
                                        <button className="ml-[8px] icon-md" onClick={() => onButtonClick(index)}>
                                            <Image src={settingsIcon} alt="text settings" />
                                        </button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </Draggable>
    );
}

interface ImageProps {
    index: number
    onButtonClick: (index: number) => void
    object: fabric.Image
}

const DraggableImage: React.FC<ImageProps> = ({ object, index, onButtonClick }) => {
    return (
        <Draggable draggableId={object.id} index={index}>
            {
                (provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        { ...provided.draggableProps }
                        className="w-full flex" 
                    >
                        <div
                            className={`group flex justify-between w-full p-[12px] pr-[16px] bg-neutral-200 rounded-[12px] mb-[16px] ${snapshot.isDragging ? 'border-[2px] border-alert-green p-[10px] pr-[14px] -rotate-6 w-auto ml-auto' : ''}`}
                        >
                            <span>{`Image ${object.typeIndex + 1}`}</span>
                            {
                                !snapshot.isDragging && (
                                    <>
                                        <Image { ...provided.dragHandleProps } src={reorderIcon} alt="reorder" className={`icon-md hidden group-hover:flex ml-auto`} />
                                        <button onClick={() => onButtonClick(index)} className="ml-[8px] icon-md">
                                            <Image  src={closeIcon} alt="delete" />
                                        </button>
                                    </>

                                )
                            }
                        </div>
                    </div>
                )
            }
        </Draggable>
    );
}

interface DrawingProps {
    index: number
    onButtonClick: (index: number) => void
    object: fabric.Path
}

const DraggableDrawing : React.FC<DrawingProps> = ({ index, onButtonClick, object }) => {

    return (
        <Draggable draggableId={object.id} index={index}>
            {
                (provided, snapshot) => (
                    <div 
                        ref={provided.innerRef}
                        { ...provided.draggableProps }
                        className="w-full flex"
                    >
                        <div
                            className={`group flex justify-between w-full px-[16px] py-[12px] bg-neutral-200 rounded-[12px] mb-[16px] ${snapshot.isDragging ? 'border-[2px] border-alert-green p-[10px] pr-[14px] -rotate-6 w-auto ml-auto' : ''}`}
                        >
                            <span>{`Drawing ${object.typeIndex + 1}`}</span>
                            {
                                !snapshot.isDragging && (
                                    <>
                                        <Image { ...provided.dragHandleProps } src={reorderIcon} alt="reorder" className={`icon-md hidden group-hover:flex ml-auto`} />
                                        <button onClick={() => onButtonClick(index)} className="icon-md ml-[8px]">
                                            <Image  src={closeIcon} alt="delete" />
                                        </button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </Draggable>
    );
}

interface CanvasObjectList {
    canvas: fabric.Canvas
    onDeleteObject: (index: number) => void
    onOpenTextModal: (index: number) => void
    handleTextChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void
    reorder: (result: DropResult) => void
}

const CanvasObjectList : React.FC<CanvasObjectList> = ({ canvas, onDeleteObject, onOpenTextModal, handleTextChange, reorder }) => {

    const objects = canvas.getObjects()

    return (
        <DragDropContext onDragEnd={reorder}>
            <Droppable droppableId="fabric-object-list">
                {
                    provided => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="w-full">
                            {
                                objects.map((object, index) => {
                                    switch(object.type) {
                                        case 'text': return (
                                            <DraggableText
                                                object={object as fabric.Text}
                                                key={object.id}
                                                index={index}
                                                onButtonClick={onOpenTextModal}
                                                onChange={handleTextChange}
                                            />
                                        )
                                        case 'image': return (
                                            <DraggableImage
                                                object={object as fabric.Image}
                                                key={object.id}
                                                index={index}
                                                onButtonClick={onDeleteObject}
                                            />
                                        )
                                        case 'path': return (
                                            <DraggableDrawing
                                                object={object as fabric.Path}
                                                key={object.id}
                                                index={index}
                                                onButtonClick={onDeleteObject}
                                            />
                                        )
                                        default: return null
                                    }
                                })
                            }
                            { provided.placeholder }
                        </div>
                    )

                }
            </Droppable>
        </DragDropContext>
    );
}

export default CanvasObjectList;
