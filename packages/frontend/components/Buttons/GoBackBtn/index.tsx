import Image from "next/image"
import { useRouter } from "next/router"

type GoBackButtonProps = {
    route?: string;
    onClick?: () => void;
}

export const GoBackButton = ({ route, onClick }: GoBackButtonProps) => {
    const router = useRouter();
    
    const handleClick = () => {
        onClick ? onClick() : route && router.push(route);
    }

    return (
        <div onClick={handleClick} className="rounded-full bg-white comic-border-mini flex items-center p-2 cursor-pointer max-w-max">
            <Image src="/assets/icons/back.svg" width="30" height="30" />
        </div>
    )
}