import Image from "next/image";
import Link from "next/link";

type MemePreviewProps = {
    meme: any;
}

export const MemePreview = ({ meme }: MemePreviewProps) => {
    const handleShareClick = () => {

    }

    return (
        <div className='border-black border-solir border-4 rounded-4xl bg-white p-6 max-w-max'>
            <Link href={`/meme/${meme.id}`}>
                <Image src={meme.src} className="h-auto cursor-pointer rounded-xl" width="275" height="200" />
            </Link>
            <div className="flex justify-between items-center mt-2">
                <div className="flex flex-col ml-2 mr-auto">
                    <h3 className="text-xs -mb-0">{meme.remixCount} remixes</h3>
                    <p className="text-gray-500 text-xs mb-0">{new Date(meme.publicationDate).toLocaleDateString('fr-CA')}</p>
                </div>
                <div onClick={handleShareClick} className="rounded-full bg-white comic-border-mini flex items-center p-2 cursor-pointer">
                    <Image src="/assets/icons/share-icon.svg" width="25" height="25" />
                </div>
            </div>
        </div>
    )
}