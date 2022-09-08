type FeedbackModalProps = {
    show: boolean;
}

export const FeedbackModal = ({ show }: FeedbackModalProps) => {
    return (
        <div className={`${show ? "block" : "hidden"} fixed h-screen w-screen z-20 flex items-center justify-center create-btn-gradient-transparent px-4 lg:px-0 top-0 left-0`}>
            <div className="main-container">
                <h3 className="text-subtitle-1 mb-[20px]">Creating meme...</h3>
                <p className="text-body-2-medium">Please wait, this can take a few minutes</p>
            </div>
        </div>
    )
}
