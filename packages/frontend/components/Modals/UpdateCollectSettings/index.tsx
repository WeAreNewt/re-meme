type UpdateCollectSettingsProps = {
    show: boolean;
    setShow: (show: boolean) => void
}

export const UpdateCollectSettingsModal = ({ show, setShow }: UpdateCollectSettingsProps) => {


    return (
        <div onMouseDown={() => setShow(false)} className={`${show ? "block" : "hidden"} fixed h-screen w-screen z-20 flex items-center justify-center create-btn-gradient-transparent px-4 lg:px-0 top-0 left-0`}>
            <div onMouseDown={(e) => e.stopPropagation()} className="comic-border rounded-4xl bg-white n:p-4 lg:p-10">
                <h2>Update collect settings</h2>
                <p>Allow users to collect your meme for a listed amount and currency. Specify which users can collect your meme. You can update and disable/enable any parameter at anytime</p>

                <h5>Currency</h5>

                <div className="flex items-center mb-4">
                    <button disabled={false} className={"flex items-center bg-white text-black rounded-full p-3 border-black border-2 border-solid min-w-fit max-h-6 comic-border-mini mr-3"}> Matic</button>
                    <button className={"flex items-center bg-white rounded-full p-3 border-black border-2 border-solid min-w-fit max-h-6 comic-border-mini mr-3"}> WETH</button>
                    <button className={"flex items-center bg-white rounded-full p-3 border-black border-2 border-solid min-w-fit max-h-6 comic-border-mini"}> USDC</button>
                </div>

                <h5>Collect amount</h5>
                <input className="border-2 border-black border-solid rounded-xl p-2 w-4/5 mb-4"/>
                
                <h5>Fund recipient</h5>
                <input className="border-2 border-black border-solid rounded-xl p-2 w-4/5 mb-4"/>

                <h5>Secondary royalty</h5>
                <input className="border-2 border-black border-solid rounded-xl p-2 w-4/5 mb-4"/>

                
                <h5>Who can collect</h5>

                <div>
                    <input className={"h-5 w-5 mr-3 mt-2 bg-black" } type="checkbox"/>
                    <label className={"align-middle"}><h5>Anyone can collect</h5></label>
                </div>
                <div>
                    <input className={"h-5 w-5 mr-3 mt-2 accent-bg-purple"} type="checkbox"/>
                    <label className={"align-middle"}><h5>Only holders of Lens profiles can collect</h5></label>
                </div>
               
               
                <div className="flex justify-end  mt-10">
                    <button className={"flex items-center bg-white rounded-full p-3 border-black border-2 border-solid min-w-fit max-h-6 comic-border-mini mr-4"}> Cancel</button>
                    <button className={"flex items-center bg-purple rounded-full p-3 border-black border-2 border-solid min-w-fit max-h-6 comic-border-mini"}> Save changes</button>
                </div>

                
            </div>
        </div>
    )
}