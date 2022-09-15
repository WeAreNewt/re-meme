import { LoginStatus } from "../../../models/Connection/connection.model"
import Marquee from "react-fast-marquee";
import { useAccount } from "wagmi";
import useLensProfiles from "../../../hooks/useLensProfiles";

export const ConnectionBox: React.FC = () => {
    const { address } = useAccount()
    const { loading } = useLensProfiles()

    return (
        <div className={'w-full h-24 rounded-full meme-header comic-border flex items-center justify-center ' + (address ? 'bg-lime' : 'bg-purple')}>
            {
                loading ?
                    <span className="text-xl font-bold">Detecting Lens Profile</span> :
                    <Marquee direction="left" speed={175} play gradient={false} className="flex h-full items-center">
                        <span className="text-xl font-bold">
                            {
                                address ?
                                "Please sign in with your Lens Profile." : 
                                "Please connect your wallet."
                            }
                        </span>
                    </Marquee>
            }
        </div>
    )
}