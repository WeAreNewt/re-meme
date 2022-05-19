import Image from "next/image";
import { ProfileCard } from "../ProfileCard";
import { RemixCount } from "../RemixCount";

type MemeDetailProps = {
    meme?: any;
}

export const MemeDetail = ({ meme }: MemeDetailProps) => {
    return (
        <div className="comic-border bg-white p-10 rounded-4xl">
            <Image src={meme.src} className="w-full h-auto" width="1600" height="1000" />
            <div className="flex justify-between items-center mt-6">
                <ProfileCard profile={meme.mockProfile} date={meme.publicationDate} />
                <RemixCount count={meme.remixCount} />
            </div>
        </div>
    )
}