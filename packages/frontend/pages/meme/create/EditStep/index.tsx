import { ChangeEventHandler, useEffect, useLayoutEffect, useRef, useState } from "react"
import { fabric } from 'fabric';
import useWindowDimensions from "../../../../hooks/window-dimensions.hook";
import EditTextModal, { EditText, TextConfig } from "../../../../components/Modals/EditTextModal";

interface EditStepProps {
    initialImage?: string
}

const DEFAULT_TEXT_CONFIG = {
    top: 0,
    left: 0,
    fontFamily: 'Helvetica',
    fill: '#000000'
}

const EditStep : React.FC<EditStepProps> = ({ initialImage }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 1024
    const [ canvas, setCanvas ] = useState<fabric.Canvas>();
    const [ texts, setTexts ] = useState<fabric.Text[]>([new fabric.Text('', DEFAULT_TEXT_CONFIG)])
    const [ images, setImages ] = useState<fabric.Image[]>([]);
    const [ openTextModal, setOpenTextModal ] = useState({
        open: false,
        index: 0
    })

    const handleMemeText = (e, index) => {
        texts[index].text = e.target.value
        canvas?.setActiveObject(texts[index])
        setTexts(texts => [...texts])
        canvas?.renderAll()
    }

    const openEditTextModal = (index: number) => {
        setOpenTextModal({
            index,
            open: true
        })
    }

    const deleteText = (index: number) => {
        if(canvas) {
            const text = texts[index]
            canvas.remove(text)
            setTexts(texts => texts.slice(0, index).concat(texts.slice(index+1)) )
        }
    }

    const remix = () => {
        const blob = canvas?.toDataURL({ format: 'png' })
        const anchor = document.createElement('a')
        anchor.href = blob || ''
        anchor.download = 'meme'
        document.body.appendChild(anchor)
        anchor.click()
        document.body.removeChild(anchor)
    }

    const uploadFileHandler = () => {
        document.getElementById("upload-file")!.click()
    }

    const setConfig = (newConfig: TextConfig, index: number) => {
        console.log(newConfig)
        const selectedText = texts[index]
        selectedText.set({
            fontFamily: newConfig.font,
            fill: newConfig.textColor
        })
        canvas?.renderAll()
        setTexts(texts => [...texts])
    }

    const addImage: ChangeEventHandler<HTMLInputElement> = (input) => {
        if (input.target.files && input.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (!e.target?.result) return;
                const img = new Image()
                img.src = e.target.result?.toString()
                img.onload = () => {
                    if(containerRef.current && canvas) {
                        const fabricImage = new fabric.Image(img, {
                            top: 0,
                            left: 0
                        })
                        setImages(images => images.concat(fabricImage))
                        canvas.add(fabricImage)
                        canvas.renderAll()
                    }
                }
            };
            reader.readAsDataURL(input.target.files[0]);
        }
    }

    const clearFileCache =  (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const element = event.target as HTMLInputElement
        element.value = ''
    }
    

    useLayoutEffect(() => {
        if(initialImage && containerRef.current) {
            const canvasCreation = new fabric.Canvas('meme-editor')
            setCanvas(canvasCreation)
            const img = new Image()
            img.src = initialImage
            img.onload = () => {
                if(containerRef.current) {
                    const fabricImage = new fabric.Image(img, {
                        top: 0,
                        left: 0
                    })
                    setImages(images => images.concat(fabricImage))
                    canvasCreation.setWidth(containerRef.current.clientWidth)
                    canvasCreation.setHeight(containerRef.current.clientWidth)
                    canvasCreation.add(fabricImage)
                    canvasCreation.add(texts[0])
                }
            }
        }
        if(!initialImage && containerRef.current) {
            const canvasCreation = new fabric.Canvas('meme-editor', { width: containerRef.current.clientWidth, height: containerRef.current.clientWidth})
            canvasCreation.add(texts[0])
            setCanvas(canvasCreation)
        }
    }, [initialImage])

    useEffect(() => {
        if(containerRef.current && canvas) {
            canvas.setWidth(containerRef.current.clientWidth)
            canvas.setHeight(containerRef.current.clientWidth)
        }
    }, [width, canvas, images])
    
    const memeControllBtns = [
        {
            src: "/assets/icons/edit-meme-1.svg",
            handleClick: () => {
                const newText = new fabric.Text('', DEFAULT_TEXT_CONFIG)
                canvas?.add(newText)
                setTexts(texts => texts.concat(newText))
            }
        },
        {
            src: "/assets/icons/edit-meme-2.svg",
            handleClick: () => {
                uploadFileHandler()
            }
        },
        {
            src: "/assets/icons/edit-meme-3.svg",
            handleClick: () => {
    
            }
        },
        {
            src: "/assets/icons/edit-meme-4.svg",
            handleClick: () => {
    
            }
        }
    ]

    return (
        <>
            {
                !isSmallScreen && openTextModal.open && (
                    <EditTextModal
                        deleteText={deleteText}
                        setOpen={setOpenTextModal}
                        index={openTextModal.index}
                        open={openTextModal.open}
                        text={texts[openTextModal.index]}
                        setConfig={setConfig}
                    />
                )
            }
            <div className="flex flex-col lg:flex-row gap-10 items-start">
                <div className='comic-border bg-white n:p-4 lg:p-10 rounded-4xl relative w-full lg:w-2/3'>
                    <div
                        className="relative overflow-hidden"
                        ref={containerRef}
                    >
                        <canvas id="meme-editor" />
                    </div>
                </div>
                {
                    isSmallScreen && openTextModal.open && (
                        <EditText 
                            deleteText={deleteText}
                            setOpen={setOpenTextModal}
                            index={openTextModal.index}
                            open={openTextModal.open}
                            text={texts[openTextModal.index]}
                            setConfig={setConfig}
                        />
                    )
                }
                <div className='comic-border bg-white n:p-4 lg:p-10 rounded-4xl relative flex flex-col items-center w-full lg:w-1/3'>
                    <p className="text-lg font-bold">MEMIXER CONTROLS</p>
                    {
                        texts.map((text, index) =>
                            <div key={`memixer_text_${index}`} className="border-2 border-black border-solid rounded-xl mb-4 flex p-2 gap-2 w-full">
                                <input
                                    onChange={e => handleMemeText(e, index)}
                                    className="w-full focus:outline-none"
                                    placeholder={`Text #${index + 1}`}
                                    value={text.text}
                                />
                                <button className="w-4 flex items-center" onClick={() => openEditTextModal(index)}>
                                    <img src="/assets/icons/pencil.svg" />
                                </button>
                            </div>
                        )
                    }
                    <div className="flex space-x-3 mb-4">
                        <input id='upload-file' accept="image/*" hidden type="file" onChange={addImage} onClick={clearFileCache} />
                        {
                            memeControllBtns.map((btn, i) => (
                                <div key={"mbicon-" + i} onClick={btn.handleClick} className="rounded-full bg-white comic-border-mini flex items-center p-2 cursor-pointer">
                                    <img src={btn.src} width="30" height="30" />
                                </div>
                            ))
                        }
                    </div>
                    <button onClick={remix} className={"create-btn-gradient rounded-full border-black border-solid border-3 px-16 sm:px-16 lg:px-20 py-3 text-lg font-bold absolute -bottom-10 " + (false ? "opacity-30" : "comic-border-mini")}>
                        REMIX
                    </button>
                </div>
            </div>
        </>
    );
}

export default EditStep;
