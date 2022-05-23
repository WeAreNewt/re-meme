import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ProfileCard } from "../ProfileCard";
import { RemixCount } from "../RemixCount";

type MemeDetailProps = {
    meme?: any;
}

export const MemeDetail = ({ meme }: MemeDetailProps) => {
    const { data } = useAccount();
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setDisabled(!data ? true : false)
    }, [data])

    return (
        <div className="comic-border bg-white p-10 rounded-4xl">
            <Image src={meme.src} className="w-full h-auto rounded-xl" width="1600" height="1000" />
            <div className="flex justify-between items-center mt-6">
                <ProfileCard profile={meme.mockProfile} subText={new Date(meme.publicationDate).toLocaleDateString('fr-CA')} />
                <RemixCount disabled={disabled} count={meme.remixCount} />
            </div>
        </div>
    )
}