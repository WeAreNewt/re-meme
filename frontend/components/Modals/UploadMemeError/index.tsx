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
                <div className="comic-border rounded-4xl bg-white n:p-4 lg:p-10">
                    <p className="text-lg text-center whitespace-pre-line px-0 lg:px-8">{selectedTexts.body}</p>
                    <div className="flex justify-center items-center space-x-4 mt-8">
                        <button onClick={handleCancel} className="comic-border-mini rounded-full bg-white px-6 py-2 font-bold">Cancel</button>
                        <button onClick={handleTryAgain} className="comic-border-mini rounded-full bg-purple px-6 py-2 font-bold">Try Again</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadMemeError;
