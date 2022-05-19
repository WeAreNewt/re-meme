import { LoginStatus } from "../../../models/Connection/connection.model"

type ConnectionBoxProps = {
    status: LoginStatus
}

export const ConnectionBox = ({ status }: ConnectionBoxProps) => {
    return (
        <div className={'w-full h-24 rounded-full meme-header comic-border ' + (status === LoginStatus.CONNECTING ? 'bg-lime' : 'bg-purple')}>
            {
                status === LoginStatus.CONNECTING ?
                    <p>Detecting Lens Profile</p>
                    : null
            }
        </div>
    )
}