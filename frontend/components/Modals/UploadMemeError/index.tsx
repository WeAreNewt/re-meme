import Marquee from "react-fast-marquee"

export enum UploadError {
    TX_CANCEL = 1,
    TX_ERROR
}

const errorTexts = {
    [UploadError.TX_CANCEL]: {
        marquee: 'TRANSACTION CANCELLED',
        body: 'The transaction was cancelled on the wallet provider. Please try again.'
    },
    [UploadError.TX_ERROR]: {
        marquee: 'Remix failed',
        body: 'Something went wrong. Please try again.'
    }
}

interface UploadMemeErrorProps {
    error?: UploadError
    setError: (error?: UploadError) => void
    onRetry: () => void
}


const UploadMemeError = ({ error, setError, onRetry }: UploadMemeErrorProps) => {

    const selectedTexts = error && errorTexts[error] ? errorTexts[error] : errorTexts[UploadError.TX_ERROR]

    const handleCancel = () => {
        setError(undefined);
    }

    const handleTryAgain = () => {
        setError(undefined)
        onRetry()
    }

    return (
        <div className={`${error ? "block" : "hidden" } fixed h-screen w-screen z-20 flex items-center justify-center create-btn-gradient-transparent px-4 lg:px-0 top-0 left-0`}>
            <div>
                <Marquee direction="left" speed={175} play gradient={false} className="bg-alert-red rounded-[100px] comic-border mb-4 p-3">
                    <span className="text-xl font-bold">
                        {selectedTexts.marquee}
                    </span>
                </Marquee>
                <div className="main-container">
                    <p className="text-subtitle-2">{selectedTexts.body}</p>
                    <div className="flex justify-center items-center space-x-4 mt-8">
                        <button onClick={handleCancel} className="btn-medium-secondary">Cancel</button>
                        <button onClick={handleTryAgain} className="btn-medium">Try Again</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadMemeError;
