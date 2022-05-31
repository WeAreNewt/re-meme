type FeedbackModalProps = {
    show: boolean;
}

export const FeedbackModal = ({ show }: FeedbackModalProps) => {
    return (
        <div className={show ? "block" : "hidden"}>
            <div className="absolute h-screen w-screen z-20 flex items-center justify-center create-btn-gradient-transparent px-4 lg:px-0">
                <div className="comic-border rounded-4xl bg-white n:p-4 lg:p-10">
                    <h3 className="text-3xl text-center font-extrabold whitespace-pre lg:whitespace-pre-line px-0 lg:px-8">Creating meme...</h3>
                    <p className="text-center whitespace-pre-line px-0 lg:px-8">Please wait, this can take a few minutes</p>
                </div>
            </div>
        </div>
    )
}