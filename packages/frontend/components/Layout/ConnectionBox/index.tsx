import { LoginStatus } from "../../../models/Connection/connection.model"
import Marquee from "react-fast-marquee";

type ConnectionBoxProps = {
    status: LoginStatus
}

export const ConnectionBox = ({ status }: ConnectionBoxProps) => {
    return (
        <div className={'w-full h-24 rounded-full meme-header comic-border ' + (status === LoginStatus.CONNECTING ? 'bg-lime' : 'bg-purple')}>
            {/* {
                status === LoginStatus.CONNECTING ?
                    <p>Detecting Lens Profile</p>
                    : null
            } */}
            <Marquee direction="left" speed={175} play gradient={false} className="flex h-full items-center">
                <span className="text-xl font-bold">Please sign in with your Lens Profile.</span>
            </Marquee>
        </div>
    )
}