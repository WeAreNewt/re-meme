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
        <div onClick={handleClick} className="icon-btn-medium-secondary">
            <img className="icon-md" alt="go back" src="/assets/icons/back.svg" />
        </div>
    )
}